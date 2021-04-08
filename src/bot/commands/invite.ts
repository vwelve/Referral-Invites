import { Message } from 'discord.js';
import config from '../../config';
import Bot from '../bot';
import Command from '../interface/command';
import sql from '../utils/connection';

export default class Invite implements Command {
    name: string = "invite";
    help: string = "Sends your personal referral invite in DMs";
    async run(bot: Bot, msg: Message, args: string[]): Promise<void> {
        let user = msg.author;
        let result = await sql.query('SELECT id FROM `invites` WHERE userId=?', [ user.id ]);

        if (result.length) {
            let { id } = result[0];

            await msg.author.send('Here is your referral link ' + config.express.baseUri+"/"+id);
        } else {
            await sql.execute('INSERT INTO `invites` (id, userId) VALUES (UUID_SHORT(), ?)', [ user.id ]);
            let [ result ] = await sql.query('SELECT id FROM `invites` WHERE userId=?', [ user.id ]);

            let { id } = result[0];

            await msg.author.send('Here is your referral link ' + config.express.baseUri+"/"+id);
        }
    }
}