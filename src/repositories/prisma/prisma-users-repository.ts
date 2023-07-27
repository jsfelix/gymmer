import { prismaClient } from '@/config/database'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  public async create(data: Prisma.UserCreateInput) {
    const user = await prismaClient.user.create({
      data,
    })
    return user
  }

  public async findByEmail(email: string) {
    const user = await prismaClient.user.findUnique({ where: { email } })
    return user
  }
}
