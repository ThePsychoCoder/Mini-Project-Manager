# Mini Project Manager


A full-stack project management tool designed to help users organize their projects and tasks efficiently. The application features a RESTful API backend built with Node.js and Express, and a dynamic, responsive frontend built with Next.js and Redux.

## Features

- **User Authentication**: Secure user signup and login using JSON Web Tokens (JWT).
- **Project Management**: Full CRUD (Create, Read, Update, Delete) functionality for projects.
- **Task Management**: Full CRUD functionality for tasks within each project.
- **Task Filtering and Sorting**: Filter tasks by status (`todo`, `in-progress`, `done`) and due date.
- **RESTful API**: A well-structured backend API for managing users, projects, and tasks.
- **State Management**: Centralized state management on the frontend using Redux Toolkit.
- **Responsive UI**: A clean and intuitive user interface built with Next.js and styled with Tailwind CSS.

## Tech Stack

| Component | Technology |
|---|---|
| **Frontend** | React, Next.js, Redux Toolkit, Axios, Tailwind CSS |
| **Backend** | Node.js, Express.js, Mongoose |
| **Database** | MongoDB |
| **Authentication**| JSON Web Token (JWT), bcryptjs |

## Project Structure

The repository is a monorepo containing two main packages:

-   `backend/`: The Node.js and Express.js server that provides the REST API.
    -   `config/`: Database connection configuration.
    -   `controllers/`: Contains the logic for handling API requests (auth, projects, tasks).
    -   `middleware/`: Custom middleware, such as the JWT authentication guard.
    -   `models/`: Mongoose schemas for `User`, `Project`, and `Task`.
    -   `routes/`: Defines the API routes.
-   `frontend/`: The client-side application built with Next.js.
    -   `src/app/`: Contains the pages and layouts using Next.js App Router.
    -   `src/features/`: Redux Toolkit slices for managing `auth`, `projects`, and `tasks` state.
    -   `src/store.js`: Configuration for the Redux store.

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm (or a compatible package manager)
-   MongoDB (local instance or a cloud service like MongoDB Atlas)

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the `backend` directory and add the following environment variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4.  **Start the backend server:**
    ```bash
    npm start
    ```
    The API will be running on `http://localhost:5000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env.local` file** in the `frontend` directory and add the backend API URL:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000
    ```

4.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

## API Endpoints

The backend exposes the following RESTful API endpoints. All project and task routes are protected and require a valid JWT.

### Auth

| Method | Endpoint         | Description      |
|--------|------------------|------------------|
| `POST` | `/api/auth/signup` | Register a new user. |
| `POST` | `/api/auth/login`  | Log in a user.   |

### Projects

| Method | Endpoint           | Description                      |
|--------|--------------------|----------------------------------|
| `GET`  | `/api/projects`      | Get all projects for the user.   |
| `POST` | `/api/projects`      | Create a new project.            |
| `PUT`  | `/api/projects/:id`  | Update a project by its ID.      |
| `DELETE`| `/api/projects/:id`| Delete a project by its ID.      |

### Tasks

| Method | Endpoint                 | Description                                  |
|--------|--------------------------|----------------------------------------------|
| `GET`  | `/api/tasks/:projectId`  | Get all tasks for a specific project.        |
| `POST` | `/api/tasks/:projectId`  | Create a new task for a project.             |
| `PUT`  | `/api/tasks/:taskId`     | Update a task by its ID.                     |
| `DELETE`| `/api/tasks/:taskId`   | Delete a task by its ID.                     |
