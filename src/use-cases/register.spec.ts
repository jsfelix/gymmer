import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from './register'
import { faker } from '@faker-js/faker'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase
let password: string

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
    password = '@MyPassword123456'
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password,
    })
    const passwordMatches = await compare(password, user.passwordHash)
    expect(passwordMatches).toBe(true)
  })

  it('should not register with same email', async () => {
    const email = faker.internet.email()
    await registerUseCase.execute({
      name: faker.person.fullName(),
      email,
      password,
    })
    await expect(
      registerUseCase.execute({
        name: faker.person.fullName(),
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should register an user', async () => {
    const { user } = await registerUseCase.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password,
    })
    expect(user.id).toEqual(expect.any(String))
  })
})
