import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  public async create({ name, email, passwordHash }: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name,
      email,
      passwordHash,
      createdAt: new Date(),
    }
    this.items.push(user)
    return user
  }

  public async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)
    if (!user) return null
    return user
  }
}
