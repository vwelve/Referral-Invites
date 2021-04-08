import { Client, Collection } from 'discord.js';
import { readdirSync } from 'node:fs';
import GuildMemberAddEvent from './events/guildMemberAdd';
import MessageEvent from './events/message';
import Command from './interface/command';

export default class Bot extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();

    public constructor() {
        super();

        this.loadCommands();
        this.loadEvents();
    }

    private loadCommands = () => {
        for (let fileName of readdirSync('./src/bot/commands')) {
            let command: Command = require(`./src/bot/commands/${fileName}`);

            this.commands.set(command.name, command);
        }
    }

    private loadEvents = () => {
        this.on('message', (message) => MessageEvent.run(message, this));
        this.on('guildMemberAdd', (member) => GuildMemberAddEvent.run(member, this));
    }

}