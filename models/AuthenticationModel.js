import pool from "../database/database.js";

 class LoginModel
{

    function checkUserLogin (user_id) {

        const conn = await pool.getConnection();

        const stmt = `
            SELECT isLogged FROM logins
            WHERE user_id = ?;
        `;

        const result = await conn.query(stmt, [user_id]);

        return result[0].isLogged;

    }

    function loginUser (user_id) {

        const conn = await pool.getConnection();

        const stmt = `
            UPDATE logins
            SET isLogged = 1
            WHERE user_id = ?;
        `;

        await conn.query(stmt, [user_id]);

    }

    function logoutUser (user_id) {

        const conn = await pool.getConnection();

        const stmt = `
            UPDATE logins
            SET isLogged = 0
            WHERE user_id = ?;
        `;

        await conn.query(stmt, [user_id]);

    }

    function createLogin (user_id) {

        const conn = await pool.getConnection();

        const stmt = `
            INSERT INTO logins (
              user_id
            ) VALUES (?);
        `;

        await conn.query(stmt, [user_id]);

    }

    function deleteLogin (user_id) {

        const conn = await pool.getConnection();

        const stmt = `
            DELETE FROM logins
            WHERE user_id = ?;
        `;

        await conn.query(stmt, [user_id]);

    }

}
