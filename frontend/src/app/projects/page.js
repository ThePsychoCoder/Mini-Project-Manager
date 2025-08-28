// Projects page for Mini Project Manager
"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  createProject,
  deleteProject,
} from "../../features/projects/projectSlice";
import { logout } from "../../features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);
  const { items, loading, error } = useSelector((state) => state.projects);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  useEffect(() => {
    if (!token) router.push("/login");
    else dispatch(fetchProjects());
  }, [token, dispatch, router]);

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createProject({ title, description }));
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id) => {
    dispatch(deleteProject(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Projects</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <form onSubmit={handleCreate} className="mb-8 flex gap-4">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded w-1/3"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded w-1/2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Project
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <ul>
        {items.map((project) => (
          <li
            key={project._id}
            className="bg-white p-4 mb-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <div className="font-bold text-lg">{project.title}</div>
              <div className="text-gray-600">{project.description}</div>
            </div>
            <button
              onClick={() => handleDelete(project._id)}
              className="bg-red-400 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
            <a href={`/projects/${project._id}`} className="ml-4 text-blue-600">
              View Tasks
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
