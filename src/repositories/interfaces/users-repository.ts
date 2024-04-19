import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  findAll(): Promise<User[]>
  findById(userId: string): Promise<User | null>
}