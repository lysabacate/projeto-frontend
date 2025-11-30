import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import authRoutes from './routes/auth.js'
import resourcesRoutes from './routes/resources.js'
import subresourcesRoutes from './routes/subresources.js'

dotenv.config()
const PORT = process.env.PORT || 5000
const prisma = new PrismaClient()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/resources', resourcesRoutes)
app.use('/subresources', subresourcesRoutes)

app.get('/', (req, res) => res.json({ ok: true }))

app.listen(PORT, async () => {
  console.log(`Backend running on http://localhost:${PORT}`)
  await prisma.$connect()
})
