import { Request, Response, NextFunction } from 'express';
import TaskService from './task.service';


class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  async getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.id;
      const task = await this.taskService.getTaskById(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, completed } = req.body;
      const newTask = await this.taskService.createTask({ title, description, completed });
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.id;
      const { title, description, completed } = req.body;
      const updatedTask = await this.taskService.updateTask(taskId, { title, description, completed });
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.id;
      const deletedTask = await this.taskService.deleteTask(taskId);
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default TaskController;