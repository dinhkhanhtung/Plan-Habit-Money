#!/bin/bash

# Database migration script for Vercel deployment
# This script generates and applies Prisma migrations to initialize the database schema

echo "Starting database migration for Plan Habit Money application..."

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Apply migrations
echo "Applying database migrations..."
npx prisma migrate deploy

# Optional: Seed the database if you have a seed script
# echo "Seeding database..."
# npx prisma db seed

echo "Database migration completed successfully!"

# Keep the database connection alive briefly to ensure all operations are committed
sleep 2