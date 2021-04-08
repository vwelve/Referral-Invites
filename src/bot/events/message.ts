import DiscordEvent from '../interface/event';
import { Message } from 'discord.js'
import Bot from '../bot';

export default class MessageEvent implements DiscordEvent {
    public name: string = "message";
    public static run = async (msg: Message, bot: Bot) => {
        
        let { content } = msg; 

        let [ cmdName, ...args  ] = content.split(" ");
        let cmd = bot.commands.get(cmdName.slice(1));

        if (cmd) {
            cmd.run(bot, msg, args);
        }
    }
}