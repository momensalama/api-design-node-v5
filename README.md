# Habit Tracker API

A RESTful API for tracking daily habits built with Node.js, Express 5, TypeScript, and PostgreSQL.

## Features

- **JWT Authentication** - Secure user registration and login
- **Habit Management** - Create, update, delete, and track habits
- **Habit Completion** - Mark habits as complete with daily tracking
- **Statistics** - Track streaks, completion rates, and progress
- **Tags** - Organize habits with customizable tags
- **Security** - Helmet, CORS, and bcrypt password hashing
- **Validation** - Zod schema validation for all inputs

## Tech Stack

- **Runtime:** Node.js (v24.3.0+)
- **Framework:** Express 5
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Authentication:** JWT (jose)
- **Validation:** Zod
- **Testing:** Vitest + Supertest

## Prerequisites

- Node.js >= 24.3.0
- PostgreSQL database
- npm or yarn

## Installation

```bash
# Clone the repository
git clone https://github.com/momensalama/api-design-node-v5.git
cd api-design-node-v5

# Install dependencies
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
APP_STAGE=dev
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/habit_tracker
JWT_SECRET=your-super-secret-key-minimum-32-characters
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
```

For testing, create a `.env.test` file with test database credentials.

## Database Setup

```bash
# Generate migrations
npm run db:generate

# Push schema to database
npm run db:push

# Run migrations
npm run db:migrate

# Seed the database (optional)
npm run db:seed

# Open Drizzle Studio (database GUI)
npm run db:studio
```

## Running the Application

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Habits

| Method | Endpoint                   | Description            |
| ------ | -------------------------- | ---------------------- |
| GET    | `/api/habits`              | Get all user habits    |
| POST   | `/api/habits`              | Create a new habit     |
| PUT    | `/api/habits/:id`          | Update a habit         |
| DELETE | `/api/habits/:id`          | Delete a habit         |
| POST   | `/api/habits/:id/complete` | Mark habit as complete |
| GET    | `/api/habits/:id/stats`    | Get habit statistics   |

### Users

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| GET    | `/api/users/profile`  | Get user profile    |
| PUT    | `/api/users/profile`  | Update user profile |
| PUT    | `/api/users/password` | Change password     |

> For detailed API documentation, see [API_DOCS.md](./API_DOCS.md)

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```text
├── src/
│   ├── index.ts          # Application entry point
│   ├── server.ts         # Express app configuration
│   ├── controllers/      # Route handlers
│   ├── db/               # Database connection & schema
│   ├── middleware/       # Express middleware
│   ├── routes/           # API routes
│   └── utils/            # Utility functions
├── tests/                # Test files
├── migrations/           # Database migrations
├── drizzle.config.ts     # Drizzle ORM configuration
├── env.ts                # Environment validation
└── vitest.config.ts      # Vitest configuration
```

## Scripts

| Script                  | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start development server with hot reload |
| `npm start`             | Start production server                  |
| `npm test`              | Run tests                                |
| `npm run test:watch`    | Run tests in watch mode                  |
| `npm run test:coverage` | Run tests with coverage report           |
| `npm run db:generate`   | Generate database migrations             |
| `npm run db:push`       | Push schema to database                  |
| `npm run db:migrate`    | Run database migrations                  |
| `npm run db:studio`     | Open Drizzle Studio                      |
| `npm run db:seed`       | Seed the database                        |

## License

ISC
