import axios, { AxiosResponse } from 'axios';
import { Router } from 'express';
import { v4 } from 'uuid';
import AccessTokenResponse from '../interfaces/accessTokenResponse';
import Referrals from '../models/referrals';
import addUser from '../utils/addUser';
import config from '../utils/config';

let router = Router();
const apiUri = 'https://discord.com/api/v8';

router.get('/api/:id', async (req, res) => {
    let id = req.params.id;
    let { discord } = config;
    let redirectUri = encodeURIComponent(discord.redirectUri);
    let scope = encodeURIComponent(discord.scope);
    let state = v4();
    let [ count, userId ] = await Referrals.getInvite(id);

    if (count) {
        req.session!.state = state;
        req.session!.inviterId = userId;

        res.redirect(`${apiUri}/oauth2/authorize?response_type=code&client_id=${discord.clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`);
    } else {
        res.status(400).send({ error: "Invalid Id" });
    }
});

router.get('/callback', async (req, res) => {
    let state = req.query.state; 
    let code = req.query.code as string;
    let error = req.query.error || null;
    let { discord } = config;

    if (state != req.session!.state || !code) {
        res.status(400).send({ error });
    } else {
        let data = {
            client_id: discord.clientId!,
            client_secret: discord.clientSecret!,
            grant_type: 'authorization_code',
            code,
            redirect_uri: discord.redirectUri,
            scope: discord.scope,
        };
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        
        try {
            let { data: result }: AxiosResponse<AccessTokenResponse> = await axios.post(apiUri + '/oauth2/token', new URLSearchParams(data), { headers });

            let [ statusCode, userId ] = await addUser(result.access_token, discord.guildId, apiUri);

            if (statusCode == 201) {
                await Referrals.addReferral(userId, req.session!.inviterId);
            }

            res.send("You can close this tab now.");
        } catch(e) {
            console.log(e);
            res.status(400).send("Something went wrong try again.");
        }
        
    }

});

router.post('/api', (req, res) => {

});

export default router;