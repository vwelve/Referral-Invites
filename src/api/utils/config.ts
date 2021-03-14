import { v4 } from "uuid";

export default {
    db: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || "referral_invites"
    },
    express: {
        port: process.env.PORT,
        secret: process.env.SECRET || v4()
    }

};