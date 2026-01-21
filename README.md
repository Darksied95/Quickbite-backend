# Quick Bite Backend

**Quick Bite Backend** is a robust, production-ready API built with **NestJS**. This project serves as a technical deep-dive into scalable backend architecture, focusing on type-safe database management, secure authentication, and infrastructure orchestration.

## 🎯 Project Intent
The primary goal of this repository is to master **NestJS** internals. It is designed to handle complex restaurant domains while maintaining high performance through Redis caching and Drizzle ORM.

## 🛠 Tech Stack
* **Framework:** [NestJS](https://nestjs.com/)
* **Database:** [PostgreSQL](https://www.postgresql.org/) (ACID compliant storage)
* **ORM:** [Drizzle ORM](https://orm.drizzle.team/) (TypeScript-first, lightweight)
* **Caching/Session:** [Redis](https://redis.io/)
* **Logging:** [Pino](https://getpino.io/)
* **Documentation:** [Swagger/OpenAPI](https://swagger.io/)
* **Validation:** [class-validator](https://github.com/typestack/class-validator) & [ValidationPipe](https://docs.nestjs.com/techniques/validation)

## 🏗 System Architecture
The backend is structured as a modular monolith, allowing for clear domain boundaries while preparing for a future monorepo transition.



### Key Modules:
- **User & Auth:** Secure authentication using JWT (Bearer Tokens) with a planned migration to HttpOnly cookies.
- **Restaurant & Menu:** Management of restaurant entities and hierarchical menu items.
- **Drivers & Reviews:** Logistics management and user feedback systems.
- **Orders:** Core business logic for processing restaurant transactions.

### Infrastructure Decisions:
- **Drizzle ORM:** Chosen for its superior TypeScript integration and minimal runtime overhead compared to TypeORM.
- **Redis Session Management:** Currently handles session storage; future iterations will include menu item caching to reduce DB load.
- **Security:** Implemented `Throttler` for rate limiting, with aggressive limits on `/auth` and `/orders` to prevent abuse.

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- pnpm

### Environment Setup
Create a `.env` file in the root directory and populate it with the following:

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=quickbite
DB_URL=postgres://your_user:your_password@localhost:5432/quickbite

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d

### Installation & Execution
1. **Start Infrastructure:**
   docker-compose up -d

2. **Install Dependencies:**
   pnpm install

3. **Run Migrations:**
   pnpm db:push

4. **Start Development Server:**
   pnpm dev

## 🛠 Development Commands
- `pnpm db:generate` - Generate Drizzle migrations.
- `pnpm db:migrate` - Apply migrations to the database.
- `pnpm db:studio` - Open Drizzle's GUI to explore data.
- `pnpm db:seed` - Populate the database with dummy data.
- `pnpm test` - Run unit tests with Jest.

## 🗺 Roadmap
- [ ] **WebSockets:** Real-time order status and notification system.
- [ ] **Cookie Auth:** Transition from Bearer tokens to secure HttpOnly cookies.
- [ ] **Redis Caching:** Implement caching for frequently accessed menu data.
- [ ] **Monorepo:** Merge with the Next.js frontend into a unified workspace.

---
*Note: This is a hobby project focused on learning NestJS best practices.*
