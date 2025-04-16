import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const [scheme, token] = authHeader.split(' ');

    if (scheme.toLowerCase() === 'bearer') {
      try {
        const decoded = jwt.verify(token, 'your-secret-key');
        (req as any).user = decoded;
        next();
      } catch (err) {
        res.status(401).send('Unauthorized: Invalid token');
      }
    }else if (scheme.toLowerCase() === 'basic') {
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        const [username, password] = decoded.split(':');

        if (username === process.env.AUTH_USERNAME && password === process.env.AUTH_PASSWORD) {
            next();
        } else {
            res.status(401).send('Unauthorized: Invalid credentials');
        }
    } else {
      res.status(401).send('Unauthorized: Invalid scheme');
    }
  } else {
    res.status(401).send('Unauthorized: No credentials provided');
  }
};

export default authMiddleware;