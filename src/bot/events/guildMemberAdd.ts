import DiscordEvent from '../interface/event';
import { GuildMember } from 'discord.js'
import Bot from '../bot';

export default class GuildMemberAddEvent implements DiscordEvent {
    public name: string = "guildMemberAdd";
    public static run(member: GuildMember, bot: Bot): void {        
    }
}