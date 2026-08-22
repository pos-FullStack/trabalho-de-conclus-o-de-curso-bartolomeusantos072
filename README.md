# SISTEMA WEB FULL STACK PARA GESTÃO E AVALIAÇÃO DE CARDÁPIO ESCOLAR: ARQUITETURA RESTFUL, REATIVIDADE E GOVERNANÇA DE DADOS NA MERENDA PÚBLICA

Software desenvolvido como Trabalho de Conclusão de Curso (TCC) apresentado como exigência para obtenção do título de Especialista em Desenvolvimento Web Full Stack pelo Instituto Federal do Sudeste de Minas Gerais – *Campus* Manhuaçu.

**Autor:** Bartolomeu Uender dos Santos – 2026  
**Objetivo:** Projetar, implementar e documentar um sistema Web Full Stack responsivo voltado à exibição automatizada do cardápio escolar diário por turno e à coleta sistemática de avaliações nutricionais, sensoriais e fotográficas submetidas pela comunidade discente.

---

## 🛠️ Tecnologias e Arquitetura

- **Front-End:** Next.js 14 (App Router), React 18, Tailwind CSS
- **Back-End:** Node.js 20, Next.js Route Handlers (API RESTful)
- **Banco de Dados & ORM:** PostgreSQL 16, Prisma ORM
- **Autenticação & Segurança:** JSON Web Token (JWT via `jose`), hashing de senhas com `bcryptjs`
- **Armazenamento de Imagens:** Integração REST com API do ImgBB
- **DevOps & Qualidade:** Docker, Docker Compose, Jest, Supertest, TypeScript 5+

---

## 📂 Estrutura do Diretório

```text
.
├── docker-compose.yml       # Orquestração dos serviços (App + PostgreSQL)
├── Dockerfile               # Configuração da imagem de produção Node.js
├── package.json             # Dependências e scripts de execução
├── prisma/
│   ├── schema.prisma        # Modelo de dados relacional e conexões
│   └── seed.js              # Script de inicialização de dados (Admin)
├── src/
│   ├── app/                 # Rotas do Next.js App Router
│   │   ├── admin/           # Painel de controle e login do gestor
│   │   ├── api/             # Endpoints REST (auth, menus, feedbacks)
│   │   └── page.tsx         # Interface pública do cardápio do dia
│   ├── components/          # Componentes reutilizáveis de UI
│   ├── lib/                 # Utilitários de banco, sessão, auth e cálculo de turno
│   └── middleware.ts        # Proteção de rotas administrativas via JWT
├── tests/                   # Testes unitários e de integração
└── tsconfig.json            # Configuração do TypeScript e mapeamento de aliases

```

---

## 📋 Pré-requisitos

* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (v2+)
* *(Opcional)* [Node.js](https://nodejs.org/) (versão 20.x ou superior)

---

## 🚀 Guia de Instalação e Execução

### 1. Clonar o Repositório

```bash
git clone [https://github.com/pos-FullStack/trabalho-de-conclus-o-de-curso-bartolomeusantos072.git](https://github.com/pos-FullStack/trabalho-de-conclus-o-de-curso-bartolomeusantos072.git)
cd trabalho-de-conclus-o-de-curso-bartolomeusantos072

```

---

### 2. Configurar as Variáveis de Ambiente

Crie o arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env

```

Edite o arquivo `.env`:

```env
# Conexão com o PostgreSQL no Docker
DATABASE_URL="postgresql://cardapio:cardapio@db001:5432/cardapio_escolar"

# Segredo de assinatura para tokens JWT
JWT_SECRET="troque-este-segredo-em-producao-123456"

# Chave de API da plataforma ImgBB ([https://api.imgbb.com/](https://api.imgbb.com/))
IMGBB_API_KEY="sua_chave_real_imgbb"
NEXT_PUBLIC_IMGBB_API_KEY="sua_chave_real_imgbb"

```

---

### 3. Subir os Containers Docker

```bash
docker compose up --build -d

```

---

### 4. Sincronizar o Banco e Executar o Seed

```bash
# 1. Cria a estrutura relacional no PostgreSQL via Prisma
docker compose exec app001 npx prisma db push

# 2. Executa o seed para cadastrar o usuário administrador padrão
docker compose exec app001 node prisma/seed.js

```

---

## 🌐 Endpoints e Acesso à Aplicação

| Interface | URL de Acesso | Descrição |
| --- | --- | --- |
| **Portal Público** | `http://localhost:3000` | Exibição em tempo real do cardápio escolar do turno vigente e formulário de avaliação. |
| **Login Administrativo** | `http://localhost:3000/admin/login` | Portal de autenticação para nutricionistas e equipe de gestão escolar. |
| **Gestão de Cardápios** | `http://localhost:3000/admin/cardapios` | Painel para cadastro, edição, exclusão e visualização de itens do cardápio. |

### Credenciais Padrão (Seed):

* **E-mail:** `admin@cardapioescolar.com`
* **Senha:** `admin123`

---

## 🧪 Testes Automatizados

```bash
docker compose exec app001 npm test

```

---

## 🗄️ Conexão com SGBD Externo (DBeaver / pgAdmin)

* **Host:** `localhost` (ou `127.0.0.1`)
* **Porta:** `5432`
* **Database:** `cardapio_escolar`
* **Usuário:** `cardapio`
* **Senha:** `cardapio`

```

### Como colar no Google Docs mantendo a formatação:
1. Abra um documento em branco no [Google Docs](https://docs.new).
2. Se você colar o texto diretamente, o Docs interpretará a sintaxe Markdown se o suporte a Markdown estiver ativo em **Ferramentas > Preferências > Detectar markdown automaticamente**.
3. Como alternativa, salve o conteúdo acima diretamente em um arquivo chamado `README.md` na raiz do projeto e envie para o GitHub com:
   ```bash
   git add README.md
   git commit -m "docs: atualiza documentacao completa do README com instrucoes de execucao"
   git push

```
