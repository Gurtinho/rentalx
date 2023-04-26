import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { sign } from 'jsonwebtoken';
import { AppError } from '../../../../errors/AppError';

interface IAuthUserRequest {
    email: string;
    password: string;
}

interface IAuthUserReturn {
    user: {
        email: string,
        name: string;
    }
    token: string
}

@injectable()
class AuthUserUseCase {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository
    ) { }
    
    async execute({ email, password }: IAuthUserRequest): Promise<IAuthUserReturn> {
        // Verificar se o usuário existe:
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Email or Password Incorrect', 401);
        }
        // Verificar se senha ta correta:
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError('Email or Password Incorrect', 401);
        }
        // Gerar token de usuário:
        const token = sign({}, process.env.JWT_TOKEN, {
            subject: user.id,
            expiresIn: '1d'
        });
        const tokenReturn = {
            user: {
                name: user.name,
                email: user.email
            },
            token
        }
        return tokenReturn;
    }
}

export { AuthUserUseCase };