import pool from "../database/database.js";

 class LoginModel
{

    static async checkUserLogin (user_id) {

        const conn = await pool.getConnection();

        const stmt = `
            SELECT isLogged FROM logins
            WHERE user_id = ?;
        `;

        const result = await conn.query(stmt, [user_id]);

        await conn.release();

        return result[0].isLogged;

    }

    static async loginUser (user_id) {

        const conn = await pool.getConnection();

        const stmt = `
            UPDATE logins
            SET isLogged = 1
            WHERE user_id = ?;
        `;

        await conn.query(stmt, [user_id]);

        await conn.release();

    }

    static async logoutUser (user_id) {

        const conn = await pool.getConnection();

        const stmt = `
            UPDATE logins
            SET isLogged = 0
            WHERE user_id = ?;
        `;

        await conn.query(stmt, [user_id]);

        await conn.release();

    }

    static async createLogin (user_id) {

        const conn = await pool.getConnection();

        const stmt = `
            INSERT INTO logins (
              user_id
            ) VALUES (?);
        `;

        await conn.query(stmt, [user_id]);

        await conn.release();

    }

    static async deleteLogin (user_id) {

        const conn = await pool.getConnection();

        const stmt = `
            DELETE FROM logins
            WHERE user_id = ?;
        `;

        await conn.query(stmt, [user_id]);

        await conn.release();

    }

}

 export default LoginModel;
