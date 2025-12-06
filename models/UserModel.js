import pool from "../database/database.js";

 class UserModel
{

    static async getData (user_id){

        const conn = await pool.getConnection();

        const stmt = `
            SELECT * FROM users
            WHERE id = ?;
        `;

        const result = await conn.query(stmt, [user_id]);

        await conn.release();

        return result[0];

    }

    static async createUser (dataObject) {

        const {
          name,
          email,
          password
        } = dataObject;


        const conn = await pool.getConnection();

        const stmt = `
            INSERT INTO users (
              name,
              email,
              password
            ) VALUES (
              ?, ?, ?
            ) RETURNING id;
        `;

        const result = await conn.query(stmt, [
          name,
          email,
          password
        ]);

        await conn.release();

        return result[0].id;

    }

    static async updateUser (user_id, dataObject) {

        const fields = Object.entries(dataObject);

        const conn = await pool.getConnection();

        for (const field of fields) {

            const stmt = `
                UPDATE users
                SET ${field[0]} = ?
                WHERE id = ?;
            `;

            await conn.query(stmt, [
              field[1],
              user_id
            ]);

        }

        await conn.release();

    }

    static async deleteUser (user_id) {

        const conn = await pool.getConnection();

        const stmt = `
            DELETE FROM users
            WHERE id = ?;
        `;

        await conn.query(stmt, [user_id]);

        await conn.release();

    }

}

 export default UserModel;
