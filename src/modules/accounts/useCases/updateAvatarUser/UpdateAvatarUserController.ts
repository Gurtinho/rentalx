import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAvatarUserUseCase } from "./UpdateAvatarUserUseCase";

class UpdateAvatarUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;
		const avatar_file = request.file.filename;
		const updateAvatarUserUseCase = container.resolve(UpdateAvatarUserUseCase);
		await updateAvatarUserUseCase.execute({ user_id: id, avatar_file });
		return response.status(204).send();
	}
}

export { UpdateAvatarUserController };
