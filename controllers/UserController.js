import pool from "../database/database.js";
import UserModel from "../models/UserModel.js";
import LoginModel from "../models/LoginModel.js";
import response from "../helpers/response.js";
import validateEmail from "../helpers/validateEmail.js";


 class UserController
{

    static async getData (user_id) {

        const result = await UserModel.getData(user_id);

        return response({
          message: "OK",
          success: true,
          data: result,
          code: 200
        });

    }

    static async createUser (dataObject) {

        const {
          email
        } = dataObject;

      // Check if user exists

        const conn = await pool.getConnection();

        let stmt = `
            SELECT email FROM users WHERE email = ?;
        `;

        let result = await conn.query(stmt, [email]);

        if (result?[0]?.email) {

            return response({
              message: "User with email " + email + " already exists!",
              success: false,
              data: null,
              code: 400
            });

        }


      // Validate email

        if (!validateEmail(email)) {

            return response({
              message: "Invalid email!",
              success: false,
              data: null,
              code: 400
            });

        }


        const user_id = await UserModel.createUser(dataObject);

        await LoginModel.createLogin(user_id);

        stmt = `
            SELECT * FROM users
            WHERE id = ?;
        `;

        result = await conn.query(stmt, [user_id]);

        return response({
          message: "CREATED!",
          success: true,
          data: result,
          code: 201
        });

    }

    static async updateUser (user_id, dataObject) {

        const { email } = dataObject;

        const conn = await pool.getConnection();

      // Check if exists

        let stmt = `
            SELECT id FROM users
            WHERE id = ?;
        `;

        let result = await conn.query(stmt, [user_id]);

        if (!result[0]?.id) {

            return response({
              message: "User not found",
              success: false,
              data: null,
              code: 404
            });

        }

      // Validate email

        if (email && !validateEmail(email)) {

            return response({
              message: "Invalid email!",
              success: false,
              data: null,
              code: 400
            });

        }

        await UserModel.updateUser(user_id, dataObject);

        stmt = `
            SELECT * FROM users
            WHERE id = ?;
        `;

        result = await conn.query(stmt, [user_id]);

        return response({
          message: "UPDATED!",
          success: true,
          data: result[0],
          code: 200
        });

    }

    static async deleteUser (user_id) {

        const conn = await pool.getConnection();

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

        await UserModel.deleteUser(user_id);

        await LoginModel.deleteLogin(user_id);

        return response({
          message: "DELETED!",
          success: true,
          data: null,
          code: 204
        });

    }

}

 export default UserController;
