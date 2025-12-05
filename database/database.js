import mariadb from "mariadb";
import dotenv from "dotenv";
import process from "process";

 dotenv.config({path: "../.env"});

 const pool = await mariadb.createPool({
   port: process.env.dbport,
   host: process.env.dbhost,
   user: process.env.dbuser,
   database: process.env.dbname
 });

 export default pool;
