import mariadb from "mariadb";
import dotenv from "dotenv";
import process from "process";
import path from "node:path";
import { fileURLToPath } from "node:url";

 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);

 dotenv.config({
   path: path.resolve(__dirname, "../.env")
 });
console.log(`port: ${process.env.dbport}`)
 const pool = await mariadb.createPool({
   port: process.env.dbport,
   host: process.env.dbhost,
   user: process.env.dbuser,
   database: process.env.dbname
 });

 export default pool;
