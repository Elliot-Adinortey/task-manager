import express from 'express';
import TaskController from './task.controller';
import TaskService from './task.service';
import prisma from '../utils/prisma';
import validateTask from './task.validation';
import authMiddleware from '../middleware/auth';
import logger from '../utils/logger';

// Initialize dependencies
const taskRouter = express.Router();
const taskService = new TaskService(prisma);
const taskController = new TaskController(taskService);

// Routes
taskRouter.get(
  ``,
  authMiddleware,
  taskController.getAllTasks.bind(taskController),
);
taskRouter.post(
  ``,
  authMiddleware,
  logger.logRequest,
  validateTask,
  taskController.createTask.bind(taskController),
);
taskRouter.get(
  `/:id`,
  authMiddleware,
  taskController.getTaskById.bind(taskController),
);
taskRouter.put(
  `/:id`,
  authMiddleware,
  validateTask,
  taskController.updateTask.bind(taskController),
);
taskRouter.delete(
  `/:id`,
  authMiddleware,
  taskController.deleteTask.bind(taskController),
);

export default taskRouter;