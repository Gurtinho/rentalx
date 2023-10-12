import { ICreateUsersDTO } from '../dtos/ICreateUsersDTO';

export interface IUsersRepository {
	create(data: ICreateUsersDTO): Promise<void>
}

