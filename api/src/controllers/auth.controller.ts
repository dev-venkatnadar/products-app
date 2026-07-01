import type { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service.js";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      res.status(200).json(result);
    } catch (error) {
    //   next(error);

    res.status(401).json({ message: (error as Error).message });
    }
  }
}

export default new AuthController();