import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

interface IRequest {
	user_id: string;
	avatar_file: string;
}

@injectable()
class UpdateAvatarUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute({ user_id, avatar_file }: IRequest) {
		const user = await this.usersRepository.findById(user_id);
		if (!user) {
			throw new AppError("User not found");
		}
		await deleteFile(`./tmp/avatar/${user.avatar}`);
		user.avatar = avatar_file;
		await this.usersRepository.create(user);
	}
}

export { UpdateAvatarUserUseCase };
