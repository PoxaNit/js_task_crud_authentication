import pool from "../database/database.js";

 class TaskModel
{

    function getAll (user_id) {

        const conn = await pool.getConnection();

        const stmt = `
            SELECT * FROM tasks
            WHERE user_id = ?;
        `;

        const result = await conn.query(stmt, [user_id]);

        return result;

    }

    function getTask (user_id, task_id) {

        const conn = await pool.getConnection();

        const stmt = `
            SELECT * FROM tasks
            WHERE user_id = ? AND id = ?;
        `;

        const result = await conn.query(stmt, [
          user_id,
          task_id
        ]);

    }

    function createTask (user_id, dataObject) {

        const {
          content
        } = dataObject;

        const conn = await pool.getConnection();

        const stmt = `
            INSERT INTO tasks (
              content,
              user_id
            ) VALUES (?, ?);
        `;

        const result = await conn.query(stmt, [
          content,
          user_id
        ]);

        return result;

    }

    function updateTask (task_id, dataObject) {

        const {
          content
        } = dataObject;

        const conn = await pool.getConnection();

        const stmt = `
            UPDATE tasks
            SET content = ?
            WHERE id = ?;
        `;

        const result = await conn.query(stmt, [
          content,
          task_id
        ]);

        return result;

    }

    function deleteTask (task_id) {

        const conn = await pool.getConnection();

        const stmt = `
            DELETE FROM tasks
            WHERE id = ?;
        `;

        await conn.query(stmt, [task_id]);

    }

    function deleteAll (user_id) {

        const conn = await pool.getConnection();

        const stmt = `
            DELETE FROM tasks
            WHERE user_id = ?;
        `;

        await conn.query(stmt, [user_id]);

    }

}
