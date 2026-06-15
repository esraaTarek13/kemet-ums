# Kemet University Management System

A full-stack university management platform built with Next.js and Supabase, featuring four portals: Super Admin, Admin, Faculty, and Student.

## Live Demo

[kemet-ums.vercel.app](https://kemet-ums.vercel.app/)

## Demo Credentials

| Portal      | Email                | Password     | Status         |
| ----------- | -------------------- | ------------ | -------------- |
| Super Admin | —                    | —            |  In Progress |
| Admin       | admin@kemet.edu      | Admin@1234   |  In Progress |
| Faculty     | dr.layla@kemet.edu   | Faculty@1234 |  In Progress |
| Student     | sara.ahmed@kemet.edu | Student@1234 |  Completed   |

## Tech Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **State Management:** Zustand
- **Server State:** TanStack Query
- **UI:** React Icons, Sonner

## Features

### Super Admin Portal

- Full access to all system data
- Admin account management
- System-wide settings and oversight

### Admin Portal

- Dashboard with enrollment trends and reports
- Student, faculty, and course management
- Announcements system
- Reports and analytics

### Faculty Portal

- Dashboard with course overview and submissions
- Grade and attendance management
- Course materials

### Student Portal (Completed)

- Dashboard with courses, assignments, and schedule
- Weekly calendar view
- Grades and transcript
- Course messaging

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account

### Installation

```bash
git clone https://github.com/esraaTarek13/kemet-ums.git
cd kemet-ums
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
