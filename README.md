
# InvoiceFlow

A production-ready full-stack Invoice SaaS built with Next.js 14+, Supabase, and Tailwind CSS.

## Features

- **Authentication**: Secure email/password login via Supabase.
- **Dashboard**: Overview of business metrics.
- **Client Management**: Create, edit, and delete clients.
- **Invoice Management**: Create and manage invoices with status tracking.
- **PDF Generation**: Print and save invoices as PDF.
- **Responsive Design**: Modern UI using Tailwind CSS.

## Setup Instructions

### 1. Install Dependencies
The project scaffolding is complete, but dependencies need to be installed:
```bash
npm install
npm install pg dotenv @types/pg --save-dev
```

### 2. Configure Environment Variables
The `.env.local` file has been created with your Supabase credentials. Ensure it contains:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL` (Connection string)

### 3. Setup Database Schema
Run the migration script to create tables and policies in your Supabase project:
```bash
node scripts/setup-db.js
```
*Note: This script requires `pg` and `dotenv` to be installed.*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

This project is ready for Vercel.
1. Push to GitHub.
2. Import project in Vercel.
3. Add the Environment Variables in Vercel Project Settings.
4. Deploy.

## Project Structure
- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components.
- `src/utils/supabase`: Supabase database and auth clients.
- `src/app/actions`: Server Actions for data mutation.
- `supabase/schema.sql`: Database schema definition.
