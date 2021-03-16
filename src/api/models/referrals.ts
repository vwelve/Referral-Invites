import sql from '../utils/connection';

export default class Referrals {

    public static getInvite = async (id: string): Promise<[number, string]> => {
        let result = await sql.query('SELECT COUNT(*) as count, userId FROM `invites` WHERE id=?', [ id ]);

        return [ result[0].count, result[0].userId ];
    }

    public static createInvite = async (userId: string, expiresIn?: string) => {
        await sql.execute('INSERT INTO invites(id, userId, expiresIn) VALUES(UUID_SHORT(), ?, ?)', [ userId, expiresIn ]);
    }

    public static addReferral = async (userId: string, inviterId: string) => {
        let result = await sql.query('SELECT COUNT(*) as count FROM referrals WHERE userId = ?', [ userId ]);

        if (result[0].count) {
            await sql.execute('UPDATE referrals SET inviterId = ? WHERE userId = ?', [ inviterId, userId ])
        } else {
            await sql.execute('INSERT INTO referrals(inviterId, userId) VALUES(?, ?)', [ inviterId, userId ])
        }
    }

    public static getReferrer = async (userId: string) => {
        let result = await sql.query('SELECT inviterId, joinedAt FROM referrals WHERE userId = ?', [ userId ]);

        return result[0];
    }

    public static getReferrals = async (inviterId: string) => {
        let results = await sql.query('SELECT userId, joinedAt FROM referrals WHERE inviterId = ?', [ inviterId ]);

        return results;
    }

}