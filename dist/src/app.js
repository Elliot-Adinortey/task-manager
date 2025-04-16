"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var task_routes_1 = __importDefault(require("./task/task.routes")); // Import taskRouter
var error_handler_1 = __importDefault(require("./middleware/error-handler")); // Import errorHandler
var logger_1 = __importDefault(require("./middleware/logger")); // Import requestLogger
var auth_1 = __importDefault(require("./middleware/auth")); // Import authMiddleware
var app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(logger_1.default);
// Authentication middleware (apply to all routes)
app.use(auth_1.default);
// API Versioning for tasks
app.use("/api/v1/tasks", task_routes_1.default);
// Error handling middleware after routes
app.use(error_handler_1.default); // Use errorHandler
exports.default = app;
//# sourceMappingURL=app.js.map