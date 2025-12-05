import pool from "../database.js";

 class TablesSeeder
{

    static async createTables () {

        console.log("CREATING TABLES...");

        const conn = await pool.getConnection();


      // table users

        let stmt = `
            CREATE TABLE IF NOT EXISTS users (
              id INT PRIMARY KEY AUTO_INCREMENT,
              created_at BIGINT,
              updated_at BIGINT,
              name TEXT,
              email TEXT,
              password TEXT
            );
        `;

        await conn.query(stmt);


      // table logins

        stmt = `
            CREATE TABLE IF NOT EXISTS logins (
              id INT PRIMARY KEY AUTO_INCREMENT,
              created_at BIGINT,
              updated_at BIGINT,
              isLogged BOOL,
              user_id INT
            );
        `;

        await conn.query(stmt);

    // table tasks

        stmt = `
            CREATE TABLE IF NOT EXISTS tasks (
              id INT PRIMARY KEY AUTO_INCREMENT,
              created_at BIGINT,
              updated_at BIGINT,
              content TEXT,
              user_id INT
            );
        `;

        await conn.query(stmt);

        console.log("DONE!");

        await conn.release();

        await pool.end();

    }

}

 TablesSeeder.createTables();
