import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemorUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { GetUserProfileService } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Get user profile Service', () => {
  let sut: GetUserProfileService
  let usersRepository: InMemorUsersRepository
  beforeEach(async () => {
    usersRepository = new InMemorUsersRepository()
    sut = new GetUserProfileService(usersRepository)

    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password_hash: await hash('johndoe.password', 6),
      role: "Administrator"
    })
  })

  it('should be able to get user profile', async () => {
    const { user } = await sut.execute({ userId: 'user-1' })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(() => sut.execute({
      userId: 'wrong'
    })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})