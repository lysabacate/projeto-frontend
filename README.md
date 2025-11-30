# Projeto Fullstack (Frontend Vue 3 + Backend Node/Express)

Este repositório contém um frontend em Vue 3 (Vite) e um backend em Node/Express com Prisma + SQLite que implementa autenticação JWT.

Para rodar localmente:

1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

O backend roda, por padrão, em http://localhost:5000 e o frontend em http://localhost:5173 (Vite).

Use as credenciais de teste: admin@example.com / 123456
