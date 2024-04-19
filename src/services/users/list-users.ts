import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/interfaces/users-repository";

interface ListUsersServiceResponse {
  users: User[]
}

export class ListUsersService {

  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<ListUsersServiceResponse> {
    const users = await this.usersRepository.findAll()
    return { users }
  }
}