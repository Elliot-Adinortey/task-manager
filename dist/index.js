"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
var logger_1 = require("./utils/logger");
var error_middleware_1 = require("./middlewares/error.middleware");
var task_routes_1 = __importDefault(require("./modules/task/task.routes"));
var validateEnv_1 = require("./utils/validateEnv");
var auth_middleware_1 = require("./middlewares/auth.middleware");
// Load environment variables from .env file
(0, dotenv_1.config)();
// Validate environment variables
(0, validateEnv_1.validateEnv)();
// Create the Express app
var app = (0, express_1.default)();
// Parse JSON request bodies
app.use(express_1.default.json());
// Log all requests
app.use(function (req, res, next) {
    logger_1.logger.info("".concat(req.method, " ").concat(req.url));
    next();
});
// Basic route
app.get('/', function (req, res) {
    res.send("Hello World!");
});
// API Versioning
var apiVersion = '/api/v1';
// Use authentication middleware for task routes
app.use("".concat(apiVersion, "/tasks"), auth_middleware_1.authMiddleware);
// Mount the task routes
app.use("".concat(apiVersion, "/tasks"), task_routes_1.default);
// Centralized error handler
app.use(error_middleware_1.errorHandler);
// Start the server
var port = parseInt(process.env.PORT || '3000');
app.listen(port, function () {
    logger_1.logger.info("Server is listening on port ".concat(port));
});
// POST /tasks: Create a new task
app.post('/tasks', function (req, res) {
    var _a = req.body, title = _a.title, description = _a.description;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }
    var newTask = { id: nextTaskId++, title: title, description: description, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
// GET /tasks/{id}: Retrieve a specific task by ID
app.get('/tasks/:id', function (req, res) {
    var taskId = parseInt(req.params.id);
    var task = tasks.find(function (t) { return t.id === taskId; });
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});
// PUT /tasks/{id}: Update an existing task
app.put('/tasks/:id', function (req, res) {
    var taskId = parseInt(req.params.id);
    var taskIndex = tasks.findIndex(function (t) { return t.id === taskId; });
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    var updatedTask = __assign(__assign(__assign({}, tasks[taskIndex]), req.body), { id: taskId });
    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
});
// DELETE /tasks/{id}: Delete a task
app.delete('/tasks/:id', function (req, res) {
    var taskId = parseInt(req.params.id);
    tasks = tasks.filter(function (t) { return t.id !== taskId; });
    res.status(204).send();
});
var port = parseInt(process.env.PORT || '3000');
app.listen(port, function () {
    console.log("listening on port ".concat(port));
});
//# sourceMappingURL=index.js.map