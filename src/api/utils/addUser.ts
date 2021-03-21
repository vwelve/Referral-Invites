import axios, { AxiosResponse } from "axios";
import DiscordUser from "../interfaces/discordUser";
import config from "../../config";

export default async (accessToken: string, guildId: string, apiUri: string): Promise<[number, string]> => {
    axios.defaults.headers = {
        Authorization: `Bearer ${accessToken}`
    };

    let { data: user }: AxiosResponse<DiscordUser> = await axios.get(`${apiUri}/users/@me`);
    
    let headers = {
        Authorization: `Bot ${config.discord.botToken}`
    }

    let { status } = await axios.put(`${apiUri}/guilds/${guildId}/members/${user.id}`, { access_token: accessToken }, { headers });
    
    return [ status, user.id ];
}