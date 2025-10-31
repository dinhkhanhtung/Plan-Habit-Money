# Database Migration Script for Plan Habit Money

This document explains how to run the database migration script to initialize the database schema for the Plan Habit Money application on Vercel.

## Overview

The migration script (`migrate.sh` for Unix/Linux/Mac or `migrate.bat` for Windows) performs the following operations:

1. Generates the Prisma client
2. Applies all database migrations to create the required tables and schema
3. Optionally seeds the database (if seed script is available)

## Database Schema

The application uses the following tables:

### Core Tables
- **User**: Stores user account information, subscription status, and usage tracking
- **Account**: OAuth provider accounts linked to users
- **Session**: User session management for authentication

### Application Features
- **WeeklyPlannerTask**: Tasks for weekly planning
- **Goal**: User-defined goals with target dates
- **Habit**: Habit tracking with streaks and frequencies
- **HabitLog**: Daily logs for habit completion
- **Budget**: Financial budgets by category and period
- **FinancialTransaction**: Income and expense transactions
- **UserSettings**: User preferences and notification settings

### Payment & Usage
- **Transaction**: Payment transactions with Stripe integration
- **UsageLog**: Daily usage tracking
- **VerificationToken**: Email verification tokens

## Running the Migration

### On Vercel (Production)

1. Ensure your `DATABASE_URL` environment variable is set in Vercel
2. Run the migration script during your build process or as a separate step:

For Unix/Linux/Mac systems:
```bash
./migrate.sh
```

For Windows systems:
```batch
migrate.bat
```

### Local Development

For local development, the migration can be run using:

```bash
# Apply migrations
npx prisma migrate dev

# Or reset and apply fresh
npx prisma migrate reset --force
```

## Environment Variables Required

- `DATABASE_URL`: Connection string for your database (SQLite for development, PostgreSQL for production)

## Notes

- The script uses `prisma migrate deploy` which is suitable for production environments
- For development, use `prisma migrate dev` instead
- Make sure to backup your database before running migrations in production
- The migration includes foreign key constraints and indexes for optimal performance

## Troubleshooting

If you encounter issues:

1. Check that your `DATABASE_URL` is correctly configured
2. Ensure the database server is accessible
3. Verify that Prisma CLI is installed (`npm install -g prisma`)
4. Check the Vercel deployment logs for detailed error messages

For more information, refer to the [Prisma Migrate documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate).