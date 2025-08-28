
# Mini Project Manager Frontend

This is the frontend for the Mini Project Manager app, built with Next.js, React, Redux Toolkit, and Axios. It supports authentication, project management, and task management features.

## Setup Instructions

1. Install dependencies:
	```bash
	npm install
	```
2. Create a `.env` file based on `.env.example`.
3. Start the development server:
	```bash
	npm run dev
	```

## Features
- User Signup/Login (JWT-based)
- Protected routes
- Project CRUD
- Task CRUD (with status and due date filtering)
- State management with Redux Toolkit
- API requests via Axios

## Folder Structure
- `src/app/` - Next.js app directory
- `src/features/` - Redux slices for auth, projects, tasks
- `src/store.js` - Redux store setup

## Important Notes
- Ensure the backend server is running and accessible at the API URL specified in `.env`.
- Update `NEXT_PUBLIC_API_URL` in `.env` if your backend runs on a different port or domain.
