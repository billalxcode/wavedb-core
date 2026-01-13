# WaveDB

> **Modern metrics evaluation platform for machine learning experiments**

WaveDB is a modern alternative to TensorBoard - an open-source platform designed for tracking, visualizing, and evaluating metrics from machine learning models, neural networks, and other experiments. It provides a clean API for logging runs, managing projects, and analyzing experiment results.

## Features

- **Project Management** - Organize your experiments into projects for better organization
- **Run Tracking** - Track individual experiment runs with status and timestamps
- **User Authentication** - Secure JWT-based authentication for multi-user environments
- **API Key Management** - Generate and manage API keys for programmatic access
- **RESTful API** - Clean and intuitive API design
- **Type-Safe** - Built with TypeScript for better developer experience

## Tech Stack

- **Runtime**: Bun / Node.js
- **Framework**: Hono (lightweight web framework)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Language**: TypeScript

## Installation

### Prerequisites

- Bun or Node.js (v18+)
- PostgreSQL database

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd wavedb-core
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run database migrations:
```bash
bun run migrate
```

5. Start the development server:
```bash
bun run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/wavedb

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d

# Server
PORT=3000
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and get JWT token |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/project/create` | Create a new project |
| GET | `/project/list` | List all user projects |

### Runs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/runner/create` | Create a new run within a project |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/` | Get user profile |
| POST | `/user/api-key` | Generate API key |

## Project Structure

```
wavedb-core/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── controllers/           # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── project.controller.ts
│   │   ├── runner.controller.ts
│   │   └── user.controller.ts
│   ├── middlewares/           # Auth & validation
│   │   ├── auth.ts
│   │   └── project.ts
│   ├── routers/              # API routes
│   │   ├── auth.router.ts
│   │   ├── project.router.ts
│   │   ├── runner.router.ts
│   │   └── user.router.ts
│   ├── services/             # Business logic
│   ├── validations/          # Zod schemas
│   ├── types/                # TypeScript types
│   ├── exceptions.ts         # Custom errors
│   ├── constants.ts
│   └── index.ts              # Entry point
├── package.json
└── tsconfig.json
```

## Usage Example

### Register a new user

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "researcher", "email": "researcher@example.com", "password": "secure123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "researcher@example.com", "password": "secure123"}'
```

### Create a project

```bash
curl -X POST http://localhost:3000/project/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name": "Image Classification Experiment", "description": "Testing ResNet variants"}'
```

### Create a run

```bash
curl -X POST http://localhost:3000/runner/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name": "resnet50-run-1", "projectId": "PROJECT_ID"}'
```

## Database Schema

```
User (id, username, email, password)
  ├── Project (id, name, description, userId)
  │    └── Run (id, name, status, startTime, endTime)
  └── ApiKey (id, key, userId)
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

---

**WaveDB** - Built with TypeScript by [Billal Fauzan](mailto:billal.xcode@gmail.com)
