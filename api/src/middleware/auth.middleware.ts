import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthUser {
  id: number;
  name: string;
  email: string;
}


export interface AuthRequest extends Request {
  user?: AuthUser
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  try {
    const token = header.slice(7);

    req.user = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthUser;

    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}