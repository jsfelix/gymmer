import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseInput {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({ name, email, password }: RegisterUseCaseInput) {
    const userExists = await this.usersRepository.findByEmail(email)
    if (userExists) throw new UserAlreadyExistsError()
    const passwordHash = await hash(password, 6)
    await this.usersRepository.create({ name, email, passwordHash })
  }
}
