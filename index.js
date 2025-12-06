import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import express from "express";
import process from "node:process";

import UserController from "./controllers/UserController.js";
import LoginController from "./controllers/LoginController.js";
import TaskController from "./controllers/TaskController.js";
import AuthenticationMiddleware from "./middlewares/AuthenticationMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: `${__dirname}/.env` });

const httpPort = process.env.httpport;

const app = express();

// Needed to read JSON bodies
app.use(express.json());

// Validate user authentication when route has :user_id
app.param("user_id", async (req, res, next, user_id) => {
    const ok = AuthenticationMiddleware.handle(user_id);

    if (!ok) {
        return res.status(401).json({
            message: "User not authenticated!",
            success: false,
            data: null,
            code: 401
        });
    }

    next();
});

// ---------------- USERS ----------------

app.get("/users/:user_id", async (req, res) => {
    const data = await UserController.getData(req.params.user_id);
    res.json(data);
});

app.post("/users", async (req, res) => {
    const data = await UserController.createUser(req.body);
    res.json(data);
});

app.put("/users/:user_id", async (req, res) => {
    const data = await UserController.updateUser(req.params.user_id, req.body);
    res.json(data);
});

app.delete("/users/:user_id", async (req, res) => {
    const data = await UserController.deleteUser(req.params.user_id);
    res.json(data);
});

// ---------------- TASKS ----------------

app.get("/users/:user_id/tasks", async (req, res) => {
    const data = await TaskController.getAll(req.params.user_id);
    res.json(data);
});

app.get("/users/:user_id/tasks/:task_id", async (req, res) => {
    const data = await TaskController.getTask(req.params.user_id, req.params.task_id);
    res.json(data);
});

app.post("/users/:user_id/tasks", async (req, res) => {
    const data = await TaskController.createTask(req.params.user_id, req.body);
    res.json(data);
});

app.put("/users/:user_id/tasks/:task_id", async (req, res) => {
    const data = await TaskController.updateTask(
        req.params.user_id,
        req.params.task_id,
        req.body
    );
    res.json(data);
});

app.delete("/users/:user_id/tasks", async (req, res) => {
    const data = await TaskController.deleteAll(req.params.user_id);
    res.json(data);
});

app.delete("/users/:user_id/tasks/:task_id", async (req, res) => {
    const data = await TaskController.deleteTask(req.params.user_id, req.params.task_id);
    res.json(data);
});

// ---------------- LOGIN ----------------

app.put("/users/:user_id/login", async (req, res) => {
    const data = await LoginController.loginUser(req.params.user_id, req.body);
    res.json(data);
});

app.put("/users/:user_id/logout", async (req, res) => {
    const data = await LoginController.logoutUser(req.params.user_id);
    res.json(data);
});

// ---------------- SERVER ----------------

app.listen(httpPort, () => {
    console.log(`Server running at port ${httpPort}`);
});
