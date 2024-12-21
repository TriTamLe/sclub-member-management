This is a [Next.js](https://nextjs.org) pet project for simulating a member management system

## Getting Started

First, run the development server:

```bash
pnpm
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Setting up database

Install all the package

```bash
pnpm install
```

You have to set up your local database on the port 5432 then replace the password in the env

```env
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@localhost:5432/sclub_management"
```

Connect to your local database and migrate the data model

```bash
pnpm migrate
```

When your database schema is successfully created, run this command to generate your own prisma client

```bash
pnpm generate
```

Finally, set up the defaults data for by running the seeding command

```bash
pnpm seed
```
