import pool from "../database/database.js";

 class TaskModel
{

    static async getAll (user_id) {

        const conn = await pool.getConnection();

        const stmt = `
            SELECT * FROM tasks
            WHERE user_id = ?;
        `;

        const result = await conn.query(stmt, [user_id]);

        await conn.release();

        return result;

    }

    static async getTask (user_id, task_id) {

        const conn = await pool.getConnection();

        const stmt = `
            SELECT * FROM tasks
            WHERE user_id = ? AND id = ?;
        `;

        const result = await conn.query(stmt, [
          user_id,
          task_id
        ]);

        await conn.release();

        return result[0];

    }

    static async createTask (user_id, dataObject) {

        const {
          content
        } = dataObject;

        const conn = await pool.getConnection();

        let stmt = `
            INSERT INTO tasks (
              content,
              user_id
            ) VALUES (?, ?);
        `;

        let result = await conn.query(stmt, [
          content,
          user_id
        ]);

        stmt = `
            SELECT * FROM tasks
            WHERE user_id = ?;
        `;

        result = await conn.query(stmt, [user_id]);

        await conn.release();

        return result;

    }

    static async updateTask (task_id, dataObject) {

        const {
          content
        } = dataObject;

        const conn = await pool.getConnection();

        let stmt = `
            UPDATE tasks
            SET content = ?
            WHERE id = ?;
        `;

        let result = await conn.query(stmt, [
          content,
          task_id
        ]);

        stmt = `
            SELECT * FROM tasks
            WHERE id = ?;
        `;

        result = await conn.query(stmt, [user_id]);

        await conn.release();

        return result[0];

    }

    static async deleteTask (task_id) {

        const conn = await pool.getConnection();

        const stmt = `
            DELETE FROM tasks
            WHERE id = ?;
        `;

        await conn.query(stmt, [task_id]);

        await conn.release();

    }

    static async deleteAll (user_id) {

        const conn = await pool.getConnection();

        const stmt = `
            DELETE FROM tasks
            WHERE user_id = ?;
        `;

        await conn.query(stmt, [user_id]);

        await conn.release();

    }

}

 export default TaskModel;
