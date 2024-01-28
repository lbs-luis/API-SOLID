import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { IUsersRepository } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async findByEmail(email: string) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      }
    })
    return userWithSameEmail
  }

  async create(data: Prisma.UserCreateInput) {
    const userWithSameEmail = await this.findByEmail(data.email)
    if (userWithSameEmail) throw new Error("E-mail already exists")

    const user = await prisma.user.create({
      data,
    })
    return user
  }
}