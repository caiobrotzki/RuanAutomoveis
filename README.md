# Ruan Automóveis

Aplicação web para uma concessionária, dividida em frontend React e API Express.

## Estado atual

Fases concluídas:

- Fase 1: configuração inicial dos projetos, TypeScript, Vite, Tailwind CSS e servidor Express.
- Fase 2: conexão com MongoDB e model `Vehicle`.
- Fase 3: API pública para listagem e consulta de veículos.
- Fase 4: tela pública de estoque integrada à API.
- Fase 5: página de detalhes, galeria de imagens e contato por WhatsApp.
- Fase 6: autenticação administrativa com bcrypt e JWT.
- Fase 7: layout administrativo e dashboard de estoque.
- Fase 8: CRUD administrativo completo de veículos.
- Fase 9: upload local, ordenação e gerenciamento de imagens dos veículos.
- Fase 10: filtros e busca do estoque sincronizados com a URL.

## Desenvolvimento

Copie `frontend/.env.example` para `frontend/.env` e `backend/.env.example` para `backend/.env`.

Em terminais separados:

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

API de verificação: `http://localhost:3000/api/health`

Endpoints públicos disponíveis:

- `GET /api/vehicles`
- `GET /api/vehicles/:id`

O backend só começa a escutar requisições depois que a conexão com MongoDB é estabelecida.

O README completo será escrito na Fase 13.
