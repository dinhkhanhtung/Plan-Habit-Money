@echo off
REM Database migration script for Vercel deployment on Windows
REM This script generates and applies Prisma migrations to initialize the database schema

echo Starting database migration for Plan Habit Money application...

REM Generate Prisma client
echo Generating Prisma client...
npx prisma generate

REM Apply migrations
echo Applying database migrations...
npx prisma migrate deploy

REM Optional: Seed the database if you have a seed script
REM echo Seeding database...
REM npx prisma db seed

echo Database migration completed successfully!

REM Keep the database connection alive briefly to ensure all operations are committed
timeout /t 2 /nobreak >nul