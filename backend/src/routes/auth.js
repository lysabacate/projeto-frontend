import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()
const prisma = new PrismaClient()
const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  console.log('POST /auth/login from', req.ip, 'body.email=', email)
  if (!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios' })

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' })

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' })

  res.json({ accessToken: token, user: { id: user.id, email: user.email, name: user.name } })
})

export default router
