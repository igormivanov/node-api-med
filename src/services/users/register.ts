import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UsersRepository } from "../../repositories/interfaces/users-repository";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

interface RegisterServiceRequest {
  name: string,
  crm: string,
  cnpj: string,
  password: string,
  email: string,
}

interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    crm,
    cnpj,
    password,
    email,
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {

    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      crm,
      cnpj,
      password_hash,
      email,
    })

    return { user }
  }
}