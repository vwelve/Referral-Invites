export default {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER || "root",
        password: process.env.PASSWORD,
        database: process.env.DB_NAME || "referral_invites"
    },
    
};