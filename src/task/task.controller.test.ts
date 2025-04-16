import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';
import TaskService from './task.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import * as jwt from 'jsonwebtoken';

process.env.DATABASE_URL = 'file:./dev.db';

describe('Task Endpoints', () => {
  const prismaMock = mockDeep<PrismaClient>();

  const taskService = new TaskService(prismaMock);
  afterAll(async () => {
    await prismaMock.$disconnect();
  });

  const token = jwt.sign({ id: 'testuser', username: 'testuser' }, 'your-secret-key');

  describe('GET /api/v1/tasks', () => {
    beforeEach(async () => {
      await taskService.deleteAllTasks();
    });
    it('should return all tasks', async () => {
      const authorizationHeader = { authorization: `Bearer ${token}` };
      await taskService.createTask({ title: 'Task 1', description: 'Description 1', completed: false });
      await taskService.createTask({
        title: 'Task 2',
        description: 'Description 2',
        completed: true,
      });

      const res = await request(app)
        .get('/api/v1/tasks')
        .set(authorizationHeader);

      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(2);
    });
  });

  describe('POST /api/v1/tasks', () => {
    beforeEach(async () => {
      await taskService.deleteAllTasks();
    });
    it('should create a new task', async () => {
      const authorizationHeader = { authorization: `Bearer ${token}` };
      const res = await request(app)
        .post('/api/v1/tasks')
        .set(authorizationHeader)
        .send({
          title: 'New Task',
          description: 'New Description',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toEqual('New Task');
      expect(res.body.description).toEqual('New Description');
      expect(res.body.completed).toEqual(false);
    });

    it('should return 400 if title is missing', async () => {
      const authorizationHeader = { authorization: `Bearer ${token}` };
      const res = await request(app)
        .post('/api/v1/tasks')
        .set(authorizationHeader)
        .send({
          description: 'New Description',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual('"title" is required');
    });

    it('should return 400 if description is missing', async () => {
      const authorizationHeader = { authorization: `Bearer ${token}` };
      const res = await request(app)
        .post('/api/v1/tasks')
        .set(authorizationHeader)
        .send({
          title: 'New Task',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual('"description" is required');
    });
  });

  describe('GET /api/v1/tasks/:id', () => {
    beforeEach(async () => {
      await taskService.deleteAllTasks();
    });
    it('should return a specific task by id', async () => {
      const authorizationHeader = { authorization: `Bearer ${token}` };
      const task = await taskService.createTask({
        title: 'Task to find',
        description: 'Description to find',
        completed: false,
      });

      const res = await request(app)
        .get(`/api/v1/tasks/${task.id}`)
        .set(authorizationHeader);

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toEqual('Task to find');
    });

    it('should return 404 if task is not found', async () => {
      const authorizationHeader = { authorization: `Bearer ${token}` };
      const res = await request(app)
        .get(`/api/v1/tasks/999`)
        .set(authorizationHeader);

      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toEqual('Task not found');
    });
  });

  describe('PUT /api/v1/tasks/:id', () => {
    beforeEach(async () => {
      await taskService.deleteAllTasks();
    });
    it('should update an existing task', async () => {
      const authorizationHeader = { authorization: `Bearer ${token}` };
      const task = await taskService.createTask({
        title: 'Task to update',
        description: 'Description to update',
        completed: false,
      });

      const res = await request(app)
        .put(`/api/v1/tasks/${task.id}`)
        .set(authorizationHeader)
        .send({ title: 'Updated Task', description: 'Updated Description', completed: true });

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toEqual('Updated Task');
      expect(res.body.description).toEqual('Updated Description');
      expect(res.body.completed).toEqual(true);
    });

    it('should return 404 if task to update is not found', async () => {
      const authorizationHeader = { authorization: `Bearer ${token}` };
      const res = await request(app)
        .put('/api/v1/tasks/999')
        .set(authorizationHeader)
        .send({ title: 'Updated Task', description: 'Updated Description', completed: false });

      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toEqual('Task not found');
    });

    it('should return 400 if title is missing', async () => {
      const authorizationHeader = { authorization: `Bearer ${token}` };
      const task = await taskService.createTask({
        title: 'Task to update',
        description: 'Description to update',
        completed: false,
      });

      const res = await request(app)
        .put(`/api/v1/tasks/${task.id}`)
        .set(authorizationHeader)
        .send({ description: 'New Description', completed: false });

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual('"title" is required');
    });

    it('should return 400 if description is missing', async () => {
      const authorizationHeader = { authorization: `Bearer ${token}` };
      const task = await taskService.createTask({
        title: 'Task to update',
        description: 'Description to update',
        completed: false,
      });
      const res = await request(app)
        .put(`/api/v1/tasks/${task.id}`)
        .set(authorizationHeader)
        .send({ title: 'New Task', completed: false });

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual('"description" is required');
    });
  });

  describe('DELETE /api/v1/tasks/:id', () => {
    beforeEach(async () => {
      await taskService.deleteAllTasks();
    });
    it('should delete a task', async () => {
      const authorizationHeader = { authorization: `Bearer ${token}` };
      const task = await taskService.createTask({
        title: 'Task to delete',
        description: 'Description to delete',
        completed: false,
      });

      const res = await request(app)
        .delete(`/api/v1/tasks/${task.id}`)
        .set(authorizationHeader);
      expect(res.statusCode).toEqual(204);
      const deletedTask = await taskService.getTaskById(task.id);
      expect(deletedTask).toBeNull();
    });

    it('should return 404 if task to delete is not found', async () => {
      const authorizationHeader = { authorization: `Bearer ${token}` };
      const res = await request(app)
        .delete('/api/v1/tasks/999')
        .set(authorizationHeader);

      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toEqual('Task not found');
    });
  });
});