import express from 'express';
import taskRouter from './task/task.routes';
import errorHandler from './middleware/error-handler';
import requestLogger from './middleware/logger'; 
import config from './config'; 
import authMiddleware from './middleware/auth'; 

const app = express();

// Middleware
app.use(express.json());
app.use(requestLogger);

// Authentication middleware (apply to all routes)
app.use(authMiddleware);

// API Versioning for tasks
app.use(`/api/v1/tasks`, taskRouter);

// Error handling middleware after routes
app.use(errorHandler); // Use errorHandler

export default app;