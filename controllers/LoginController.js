import pool from "../database/database.js";
import UserModel from "../models/UserModel.js";
import LoginModel from "../models/LoginModel.js";
import response from "../helpers/response.js";

 class LoginController
{

    static async loginUser (user_id) {

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

        await LoginModel.loginUser(user_id);

        const data = await UserModel.getData(user_id);

        return response({
          message: "User is now logged in!",
          success: true,
          data: data,
          code: 200
        });

    }

    static async logoutUser (user_id) {

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

        await LoginModel.logoutUser(user_id);

        const data = await UserModel.getData(user_id);

        return response({
          message: "User is now logged out!",
          success: true,
          data: data,
          code: 200
        });

    }

}

 export default LoginController;
