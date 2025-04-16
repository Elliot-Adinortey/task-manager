import express from 'express';
import taskRouter from './task/task.routes'; // Import taskRouter
import errorHandler from './middleware/error-handler'; // Import errorHandler
import requestLogger from './middleware/logger'; // Import requestLogger
import config from './config'; // Import config
import authMiddleware from './middleware/auth'; // Import authMiddleware

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