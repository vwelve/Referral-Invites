import { GuildMember, Message, MessageEmbed } from 'discord.js';
import sql from '../utils/connection';
import Command from '../interface/command';
import Bot from '../bot';

let getInviter = async (bot: Bot, msg: Message, user: GuildMember): Promise<MessageEmbed | string> => {
    let result = await sql.query('SELECT inviterId, joinedAt FROM `referrals` WHERE userId=?', [ user.id ]);

    if (result.length) {
        let { inviterId, joinedAt } = result[0];

        let inviter = await bot.users.fetch(inviterId);

        let embed = new MessageEmbed()
            .setDescription(`\`\`\`
User: ${user}
Inviter: ${inviter}
Time Joined: ${joinedAt}
            \`\`\``);

        return embed;
    }
    return "Could not find user";
}

export default class GetReferral implements Command {
    name: string = "referral";
    help: string = "Gives information on who invited the user and when";
    async run(bot: Bot, msg: Message, args: string[]): Promise<void> {
        let user = msg.mentions.members?.first() || msg.member;

        if (user) {
            let content = await getInviter(bot, msg, user); 
            await msg.channel.send(content);
        }
    }

}