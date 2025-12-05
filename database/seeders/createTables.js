import pool from "../database.js";

 async function createTables () {

     const tables = [
       "users",
       "tasks"
     ];

     const conn = await pool.getConnection();

     for (const tbl of tables) {

         let stmt = `
             CREATE TABLE IF NOT EXISTS ${tbl};
         `;

         await conn.query(stmt);

     }

 }
