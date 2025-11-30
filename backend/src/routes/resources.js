import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '../middleware/auth.js'

const prisma = new PrismaClient()
const router = express.Router()

router.get('/', async (req, res) => {
  const { q, status, autor } = req.query
  const where = {}
  if (q) {
    where.OR = [
      { titulo: { contains: q } },
      { texto: { contains: q } },
      { autor: { contains: q } }
    ]
  }
  if (status) where.status = status
  if (autor) where.autor = autor
  const resources = await prisma.resource.findMany({ where, include: { subresources: true }, orderBy: { createdAt: 'desc' } })
  res.json(resources)
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const resource = await prisma.resource.findUnique({ where: { id }, include: { subresources: true } })
  if (!resource) return res.status(404).json({ error: 'Recurso não encontrado' })
  res.json(resource)
})

router.post('/', authMiddleware, async (req, res) => {
  const { titulo, texto, autor, status, categoria } = req.body
  const created = await prisma.resource.create({ data: { titulo, texto, autor, status, categoria } })
  res.status(201).json(created)
})

router.put('/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id)
  const { titulo, texto, autor, status, categoria } = req.body
  const updated = await prisma.resource.update({ where: { id }, data: { titulo, texto, autor, status, categoria, updatedAt: new Date() } })
  res.json(updated)
})

router.delete('/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id)
  await prisma.resource.delete({ where: { id } })
  res.status(204).send()
})

export default router
