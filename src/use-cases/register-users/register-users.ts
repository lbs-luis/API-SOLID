import { IUsersRepository } from "@/repositories/users/IUsersRepository"
import { User } from "@prisma/client"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error"

interface IRegisterStoresService {
  name: string,
  email: string,
  password: string
  role?: 'ADMIN' | 'OPERATOR'
}

interface IRegisterStoresServiceResponse {
  user: User
}

export class RegisterStoresService {
  constructor(private usersRepository: IUsersRepository) { }

  async execute({ name, email, password, role }: IRegisterStoresService): Promise<IRegisterStoresServiceResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) throw new UserAlreadyExistsError()

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      role,
    })

    return {
      user
    }
  }
}