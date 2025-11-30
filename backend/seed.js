import { execSync } from 'child_process'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('Criando/atualizando banco (prisma db push)...')
  execSync('npx prisma db push', { stdio: 'inherit' })

  const passwordHash = await bcrypt.hash('123456', 10)

  let user = await prisma.user.findUnique({ where: { email: 'admin@example.com' } })
  if (!user) {
    user = await prisma.user.create({ data: { email: 'admin@example.com', password: passwordHash, name: 'Admin' } })
    console.log('Usuário seed criado: admin@example.com / 123456')
  }

  // resources
  const existing = await prisma.resource.findMany()
  if (existing.length === 0) {
    const r1 = await prisma.resource.create({ data: { titulo: 'Hello-World', texto: 'Primeira mensagem atualizada', autor: 'Clara', categoria: 'geral', status: 'published' } })
    const r2 = await prisma.resource.create({ data: { titulo: 'Teste', texto: 'Teste22222', autor: 'Ronald', categoria: 'teste', status: 'draft' } })

    await prisma.subresource.create({ data: { resourceId: r1.id, texto: 'Comentário 1', autor: 'Comentador' } })
    await prisma.subresource.create({ data: { resourceId: r1.id, texto: 'Comentário 2', autor: 'Outra pessoa' } })
    console.log('Seed de recursos e subresources criado')
  }

  console.log('Seed completo')
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
