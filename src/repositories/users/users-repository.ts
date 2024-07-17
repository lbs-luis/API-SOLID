import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { IUsersRepository } from "./IUsersRepository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";

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
    if (userWithSameEmail) throw new UserAlreadyExistsError()

    const user = await prisma.user.create({
      data,
    })
    return user
  }
}