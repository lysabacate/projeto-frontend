import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '../middleware/auth.js'

const prisma = new PrismaClient()
const router = express.Router()

router.get('/', async (req, res) => {
  const { resourceId } = req.query
  const where = resourceId ? { where: { resourceId: Number(resourceId) } } : {}
  const subresources = await prisma.subresource.findMany({ ...where, orderBy: { createdAt: 'desc' } })
  res.json(subresources)
})

router.post('/', authMiddleware, async (req, res) => {
  const { resourceId, texto, autor } = req.body
  const created = await prisma.subresource.create({ data: { resourceId: Number(resourceId), texto, autor } })
  res.status(201).json(created)
})

router.put('/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id)
  const { texto, autor } = req.body
  const updated = await prisma.subresource.update({ where: { id }, data: { texto, autor } })
  res.json(updated)
})

router.delete('/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id)
  await prisma.subresource.delete({ where: { id } })
  res.status(204).send()
})

export default router
