import { $Enums, Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { UsersRepository } from "./interfaces/users-repository";

export class PrismaUsersRepository implements UsersRepository{

  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    return user;
  }

  async findAll(){
    const users = await prisma.user.findMany()
    return users
  }

  async findByEmail(email: string){
    const user = await prisma.user.findUnique({
      where: {
        email
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput){
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}