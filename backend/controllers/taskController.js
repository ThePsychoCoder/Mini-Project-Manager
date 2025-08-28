// taskController.js - Handles task management logic
import Task from "../models/Task.js";
import Project from "../models/Project.js";

/**
 * Get tasks for a project (with filter/sort)
 */
export const getTasks = async (req, res) => {
  const { status, duedate } = req.query;
  let query = {
    project: req.params.projectId,
  };
  if (status) query.status = status;
  if (duedate) query.duedate = { $lte: new Date(duedate) };
  const tasks = await Task.find(query).sort({ duedate: 1 });
  res.json(tasks);
};

/**
 * Create a new task for a project
 */
export const createTask = async (req, res) => {
  const { title, description, status, duedate } = req.body;
  // Ensure project belongs to user
  const project = await Project.findOne({
    _id: req.params.projectId,
    user: req.user,
  });
  if (!project) return res.status(404).json({ message: "Project not found" });
  const task = await Task.create({
    project: req.params.projectId,
    title,
    description,
    status,
    duedate,
  });
  res.status(201).json(task);
};

/**
 * Edit an existing task
 */
export const editTask = async (req, res) => {
  const { title, description, status, duedate } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.taskId,
    {
      title,
      description,
      status,
      duedate,
    },
    { new: true }
  );
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

/**
 * Delete a task
 */
export const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.taskId);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
};
