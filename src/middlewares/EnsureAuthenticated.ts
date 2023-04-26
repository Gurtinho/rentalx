import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';
import { AppError } from '../errors/AppError';

interface IPayload {
    sub: string;
}

async function EnsureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction) {
    const tokenHeader = request.headers.authorization;
    if (!tokenHeader) {
        throw new AppError('Token missing', 401);
    }
    const [, token] = tokenHeader.split(' ');
    try {
        const { sub: user_id } = verify(token, process.env.JWT_TOKEN) as IPayload;
        const userRepository = new UsersRepository();
        const user = await userRepository.findById(user_id);
        if (!user) {
            throw new AppError('User does not exists', 401);
        }
        // Setar valor dentro do user do request
        request.user = {
            id: user_id
        };
        next();
    } catch {
        throw new AppError('Invalid token', 401);
    }
}

export { EnsureAuthenticated };