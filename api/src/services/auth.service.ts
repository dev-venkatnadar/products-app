// src/services/auth.service.ts

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import type { SignOptions } from "jsonwebtoken";

class AuthService {
    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const expiresIn = (process.env.JWT_EXPIRES_IN ?? "1h") as NonNullable<
            SignOptions["expiresIn"]
        >;

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: expiresIn,
            }
        );

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
}

export default new AuthService();