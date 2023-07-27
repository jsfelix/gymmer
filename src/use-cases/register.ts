import { prismaClient } from '@/config/database'
import { hash } from 'bcryptjs'

interface RegisterUseCaseInput {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseInput) {
  const userExists = await prismaClient.user.findUnique({ where: { email } })
  if (userExists) throw new Error('email already exists')
  const passwordHash = await hash(password, 6)
  await prismaClient.user.create({
    data: {
      email,
      name,
      passwordHash,
    },
  })
}
