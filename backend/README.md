# Backend - Projeto Full-Stack

Este backend é uma API Node.js + Express simples usando SQLite (Prisma) e JWT para autenticação.

Pré-requisitos:
- Node.js v18+

Instalação:

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Endpoints principais:

- POST /auth/login
- GET /resources
- GET /resources/:id
- POST /resources
- PUT /resources/:id
- DELETE /resources/:id

- GET /subresources?resourceId=<id>
- POST /subresources
- PUT /subresources/:id
- DELETE /subresources/:id

Use o token JWT retornado pelo /auth/login no header Authorization: Bearer <token> para chamadas protegidas.
