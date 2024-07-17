import { IUsersRepository } from "@/repositories/users/IUsersRepository"
import { hash } from "bcryptjs"

interface IRegisterService {
  name: string,
  email: string,
  password: string
}

export class RegisterService {
  private usersRepository: IUsersRepository
  constructor(private repository: new () => IUsersRepository) {
    this.usersRepository = new this.repository()
  }

  async execute({ name, email, password }: IRegisterService) {

    const password_hash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}