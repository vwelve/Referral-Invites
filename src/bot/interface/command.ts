import { Message } from "discord.js";
import Bot from "../bot";

export default interface Command {
    name: string;
    help: string;
    run(bot: Bot, msg: Message, args: string[]): Promise<void>;
}