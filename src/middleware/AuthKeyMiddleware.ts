import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apikey = req.headers['to-do-apikey'];

    if (apikey !== process.env.APIKEY_VALUE) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  }
}
