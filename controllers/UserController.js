import pool from "../database/database.js";
import UserModel from "../models/UserModel.js";
import response from "../helpers/response.js";

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

        let result = await conn.query(stmt, []);

        await UserModel.createUser(dataObject);

        return response({
          message: "CREATED!",
          success: true,
          data: null,
          code: 201
        });

    }

}
