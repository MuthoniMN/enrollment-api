import { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const key: Secret = process.env.SECRET_KEY as Secret;

export interface AuthenticatedRequest extends Request {
  user: {
    id: number,
    username: string
  }
}

export const auth = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const header = (req.header('Authorization') as string);

    if(!header) {
      res.json({
        status: 401,
        message: "Unauthenticated request!",
        data: {}
      }).status(401);
      return;
    }

    const [head, token] = header.split(' ');

    if(!token){
      res.json({
        status: 401,
        message: "Unauthenticated request!",
        data: {}
      }).status(401);
      return;
    }

    const decoded = verifyToken(token) as JwtPayload;
    (req as AuthenticatedRequest).user = decoded.user;

    next();
  } catch (e) {
      console.error(e);
      res.json({
        status: 500,
        message: "Internal Server Error",
        data: {}
      }).status(500);
      return;
  }
}
