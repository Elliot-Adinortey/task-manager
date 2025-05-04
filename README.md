# Task Manager API (Node.ts)

A simple, RESTful Task Manager API built with Node.js, Express, and TypeScript. This sample project provides endpoints to create, read, update, and delete tasks, demonstrating best practices for structure, error handling, and documentation.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Configuration](#configuration)
* [Scripts](#scripts)
* [Project Structure](#project-structure)
* [API Endpoints](#api-endpoints)
* [Error Handling](#error-handling)
* [Logging](#logging)
* [Testing](#testing)
* [Contributing](#contributing)
* [License](#license)

---

## Features

* CRUD operations for tasks
* Request validation
* Structured error responses
* Environment-based configuration
* Centralized logging
* TypeScript typings throughout
* Unit and integration tests

## Tech Stack

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Jest](https://jestjs.io/) for testing
* [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for linting & formatting

## Prerequisites

* Node.js v18+
* npm v9+ or Yarn v1.22+

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Elliot-Adinortey/task-manager.git
   cd task-manager
   ```
2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

## Configuration

Create a `.env` file in the project root or set environment variables directly. Example `.env`:

```dotenv
PORT=4000
NODE_ENV=development
LOG_LEVEL=info
DATABASE_URL=mongodb://localhost:27017/task-manager
JWT_SECRET=your-secure-secret
```

| Variable       | Default       | Description                                  |
| -------------- | ------------- | -------------------------------------------- |
| `PORT`         | `4000`        | Port where server listens                    |
| `NODE_ENV`     | `development` | Environment (development/production)         |
| `LOG_LEVEL`    | `info`        | Logging verbosity (error, warn, info, debug) |
| `DATABASE_URL` | -             | MongoDB connection string                    |
| `JWT_SECRET`   | -             | Secret key for JSON Web Tokens               |

## Scripts

* `npm run dev` - Start in development mode (with auto-reload)
* `npm run build` - Compile TypeScript to JavaScript
* `npm start` - Run compiled build
* `npm test` - Run tests with Jest
* `npm lint` - Run ESLint
* `npm format` - Run Prettier

## Project Structure

```
├── src
│   ├── controllers      # Route handlers
│   ├── models           # Mongoose schemas or TypeORM entities
│   ├── routes           # Express route definitions
│   ├── services         # Business logic
│   ├── middlewares      # Express middleware (auth, error, validation)
│   ├── utils            # Helper functions (logger, config)
│   ├── types            # Custom TypeScript types/interfaces
│   ├── app.ts           # Express app initialization
│   └── index.ts         # Server bootstrap
├── tests                # Unit and integration tests
├── .env.example         # Sample environment file
├── jest.config.js       # Jest configuration
├── tsconfig.json        # TypeScript configuration
├── .eslintrc.js         # ESLint config
├── .prettierrc          # Prettier config
└── package.json
```

## API Endpoints

### Tasks

| Method | Endpoint         | Description             | Body                                                            |
| ------ | ---------------- | ----------------------- | --------------------------------------------------------------- |
| GET    | `/api/tasks`     | List all tasks          | -                                                               |
| GET    | `/api/tasks/:id` | Get task by ID          | -                                                               |
| POST   | `/api/tasks`     | Create a new task       | `{ title: string, description?: string, completed?: boolean }`  |
| PUT    | `/api/tasks/:id` | Update an existing task | `{ title?: string, description?: string, completed?: boolean }` |
| DELETE | `/api/tasks/:id` | Delete a task           | -                                                               |

### Auth (Optional)

Endpoints for user registration, login, and JWT-based authentication middleware.

## Error Handling

Errors return structured JSON:

```json
{
  "status": "error",
  "message": "Detailed error message",
  "errors": [ ... ]
}
```

## Logging

Uses [winston](https://github.com/winstonjs/winston) for centralized, level-based logging. Logs include timestamps and context.

## Testing

* Run all tests:

  ```sh
  npm test
  ```
* Coverage report in `coverage` folder.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/awesome-feature`
3. Commit your changes: `git commit -m 'Add awesome feature'`
4. Push to the branch: `git push origin feature/awesome-feature`
5. Open a Pull Request.

Please follow the existing code style and run linting/tests before submitting.

## License

MIT License © Elliot Adinortey
