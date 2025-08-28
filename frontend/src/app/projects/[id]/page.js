// Project Tasks page for Mini Project Manager
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  editTask,
  deleteTask,
} from "../../../features/tasks/taskSlice";
import { useRouter, useParams } from "next/navigation";

const statusOptions = ["todo", "in-progress", "done"];

export default function ProjectTasksPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id;
  const { items, loading, error } = useSelector((state) => state.tasks);
  const { token } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [duedate, setDuedate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDue, setFilterDue] = useState("");

  useEffect(() => {
    if (!token) router.push("/login");
    else dispatch(fetchTasks(projectId));
  }, [token, dispatch, router, projectId]);

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createTask({ projectId, data: { title, description, status, duedate } })
    );
    setTitle("");
    setDescription("");
    setStatus("todo");
    setDuedate("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  // Filtering logic
  const filteredTasks = items.filter((task) => {
    let statusMatch = filterStatus ? task.status === filterStatus : true;
    let dueMatch = filterDue
      ? new Date(task.duedate) <= new Date(filterDue)
      : true;
    return statusMatch && dueMatch;
  });

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Tasks for Project</h1>
      <form onSubmit={handleCreate} className="mb-8 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded w-1/4"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded w-1/4"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded"
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={duedate}
          onChange={(e) => setDuedate(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>
      <div className="mb-4 flex gap-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Status</option>
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={filterDue}
          onChange={(e) => setFilterDue(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task._id}
            className="bg-white p-4 mb-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <div className="font-bold">{task.title}</div>
              <div className="text-gray-600">{task.description}</div>
              <div className="text-sm">Status: {task.status}</div>
              <div className="text-sm">
                Due:{" "}
                {task.duedate
                  ? new Date(task.duedate).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-400 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <a href="/projects" className="text-blue-600">
        Back to Projects
      </a>
    </div>
  );
}
