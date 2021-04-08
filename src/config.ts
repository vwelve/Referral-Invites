import { v4 } from "uuid";
import dotenv from 'dotenv';

dotenv.config();

export default {
    db: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME || "referral_invites"
    },
    discord: {
        clientId: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        guildId: process.env.GUILD_ID!,
        redirectUri: process.env.REDIRECT_URI || "http://localhost:8000/callback",
        scope: 'identify guilds.join',
        botToken: process.env.BOT_TOKEN
    },
    express: {
        baseUri: process.env.BASE_URI || "http://localhost:8000",
        port: process.env.PORT || 8000,
        secret: process.env.SECRET || v4()
    }
};