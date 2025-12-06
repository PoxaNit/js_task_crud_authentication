import LoginModel from "../models/LoginModel.js";

 class AuthenticationModel
{

    static async handle (user_id) {

        const isLogged = await LoginModel.checkUserLogin(user_id);

        if (isLogged) {

            return true; // success

        } else {

            return false; // not success

        }

    }

}
