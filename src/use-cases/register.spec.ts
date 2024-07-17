import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemorUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Service', () => {
  let sut: RegisterService
  beforeEach(() => {
    sut = new RegisterService(new InMemorUsersRepository())
  })

  it('should be able to register', async () => {

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'johndoe.password',
      role: "Administrator"
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'johndoe.password',
      role: "Administrator"
    })

    expect(() => sut.execute({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'johndoe.password',
      role: "Administrator"
    })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: 'johndoe.password',
      role: "Administrator"
    })

    const isPasswordCorrectlyHashed = await compare('johndoe.password', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})