import sql from '../utils/connection';

export default class Referrals {

    public static getInvite = async (id: string) => {
        let result = await sql('SELECT COUNT(*) as count FROM invites WHERE id=CAST(? AS BIGINT)', [ id ]);

        console.log(result)

        return result;
    }

    public static createInvite = async (userId: string, expiresIn?: string) => {
        let result = await sql('INSERT INTO invites(id, userId, expiresIn) VALUES(UUID_SHORT(), ?, ?)', [ userId, expiresIn ]);

        console.log(result);
    }

    public static addReferral = async (userId: string, inviterId: string) => {
        let result = await sql('SELECT COUNT(*) FROM referrals WHERE userId = ?', [ userId ]);

        console.log(result);

        if (result) {
            await sql('UPDATE referrals SET inviterId = ? WHERE userId = ?', [ inviterId, userId ])
        } else {
            await sql('INSERT INTO referrals(inviterId, userId) VALUES(?, ?)', [ inviterId, userId ])
        }
    }

    public static getReferrer = async (userId: string) => {
        let result = await sql('SELECT inviterId, joinedAt FROM referrals WHERE userId = ?', [ userId ]);

        console.log(result);

        return result;
    }

    public static getReferrals = async (inviterId: string) => {
        let result = await sql('SELECT userId, joinedAt FROM referrals WHERE inviterId = ?', [ inviterId ]);

        console.log(result);

        return result;
    }

}