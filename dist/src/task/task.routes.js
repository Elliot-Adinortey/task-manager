"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var task_controller_1 = __importDefault(require("./task.controller"));
var task_service_1 = __importDefault(require("./task.service"));
var prisma_1 = __importDefault(require("../utils/prisma"));
var task_validation_1 = __importDefault(require("./task.validation"));
var auth_1 = __importDefault(require("../middleware/auth"));
var logger_1 = __importDefault(require("../utils/logger"));
// Initialize dependencies
var taskRouter = express_1.default.Router();
var taskService = new task_service_1.default(prisma_1.default);
var taskController = new task_controller_1.default(taskService);
// Routes
taskRouter.get("", auth_1.default, taskController.getAllTasks.bind(taskController));
taskRouter.post("", auth_1.default, logger_1.default.logRequest, task_validation_1.default, taskController.createTask.bind(taskController));
taskRouter.get("/:id", auth_1.default, taskController.getTaskById.bind(taskController));
taskRouter.put("/:id", auth_1.default, task_validation_1.default, taskController.updateTask.bind(taskController));
taskRouter.delete("/:id", auth_1.default, taskController.deleteTask.bind(taskController));
exports.default = taskRouter;
//# sourceMappingURL=task.routes.js.map