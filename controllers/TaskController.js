import pool from "../database/database.js";
import response from "../helpers/response.js";
import TaskModel from "../models/TaskModel.js";

 class TaskController
{

    static async getAll (user_id) {

        const conn = await pool.getConnection();

      // Check if user exists

        let stmt = `
            SELECT id FROM users
            WHERE id = ?;
        `;

        let result = await conn.query(stmt, [user_id]);

        if (!result?.[0]?.id) {

            return response({
              message: "User not found",
              success: false,
              data: null,
              code: 404
            });

        }

        const data = await TaskModel.getAll(user_id);

        return response({
          message: "OK",
          success: true,
          data: data,
          code: 200
        });

    }

    static async getTask (user_id, task_id) {

        const conn = await pool.getConnection();

        let stmt = `
            SELECT id FROM users
            WHERE id = ?;
        `;

        let result = await conn.query(stmt, [user_id]);

        if (!result?.[0]) {

            return response({
              message: "User not found",
              success: false,
              data: null,
              code: 404
            });

        }

        stmt = `
            SELECT id FROM tasks
            WHERE id = ?;
        `;

        result = await conn.query(stmt, [task_id]);

        if (!result?.[0]) {

            return response({
              message: "Task not found",
              success: false,
              data: null,
              code: 404
            });

        }

        const data = await TaskModel.getTask(user_id, task_id);

        return response({
          message: "OK",
          success: true,
          data: data,
          code: 200
        });

    }

    static async createTask (user_id, dataObject) {

        const data = await TaskModel.createTask(user_id, dataObject);

        return response({
          message: "CREATED!",
          succes: true,
          data: data,
          code: 201
        });

    }

    static async updateTask (task_id, dataObject) {

        const conn = await pool.getConnection();

        let stmt = `
            SELECT id FROM tasks
            WHERE id = ?;
        `;

        let result = await conn.query(stmt, [task_id]);

        if (!result?.[0]) {

            return response({
              message: "Task not found",
              success: false,
              data: null,
              code: 404
            });

        }

        const data = await TaskModel.updateTask(task_id, dataObject);

        return response({
          message: "UPDATED!",
          success: true,
          data: data,
          code: 200
        });

    }

    static async deleteTask (task_id) {

        const conn = await pool.getConnection();

        let stmt = `
            SELECT id FROM tasks
            WHERE id = ?;
        `;

        let result = await conn.query(stmt, [task_id]);

        if (!result?.[0]) {

            return response({
              message: "Task not found",
              success: false,
              data: null,
              code: 404
            });

        }


        await TaskModel.deleteTask(task_id);

        return response({
          message: "DELETED!",
          success: true,
          data: null,
          code: 204
        });

    }


    static async deleteAll (user_id) {

        const conn = await pool.getConnection();

      // Check if user exists

        let stmt = `
            SELECT id FROM users
            WHERE id = ?;
        `;

        let result = await conn.query(stmt, [user_id]);

        if (!result?.[0]?.id) {

            return response({
              message: "User not found",
              success: false,
              data: null,
              code: 404
            });

        }

        await TaskModel.deleteAll(user_id);

        return response({
          message: "DELETED!",
          success: true,
          data: null,
          code: 204
        });

    }

}

 export default TaskController;
