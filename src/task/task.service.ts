import { PrismaClient } from '@prisma/client';
import { Task } from './task.model';

export default class TaskService {
    private prisma: PrismaClient;
    constructor(prisma: PrismaClient){
        this.prisma = prisma;
    }
    async getAllTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
    }

    async getTaskById(id: string): Promise<Task | null> {
        return this.prisma.task.findUnique({ where: { id } });
    }

    async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
        return this.prisma.task.create({ data: taskData });
    }

    async updateTask(id: string, taskData: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Task | null> {
        return this.prisma.task.update({ where: { id }, data: taskData });
    }

    async deleteTask(id: string): Promise<Task | null> {
        return this.prisma.task.delete({ where: { id } });
    }
    async deleteAllTasks(): Promise<void> {
      await this.prisma.task.deleteMany({});
    }
}