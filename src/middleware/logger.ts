import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';



const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  
  logger.logRequest(`Request: ${req.method} ${req.url}`);
  next();
};
export default requestLogger;