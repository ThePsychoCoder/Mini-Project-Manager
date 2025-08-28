// projectController.js - Handles project management logic
import Project from '../models/Project.js';

/**
 * Get all projects for the authenticated user
 */
export const getProjects = async (req, res) => {
  const projects = await Project.find({ user: req.user });
  res.json(projects);
};

/**
 * Create a new project for the authenticated user
 */
export const createProject = async (req, res) => {
  const { title, description } = req.body;
  const project = await Project.create({ user: req.user, title, description });
  res.status(201).json(project);
};

/**
 * Edit an existing project
 */
export const editProject = async (req, res) => {
  const { title, description } = req.body;
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    { title, description },
    { new: true }
  );
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

/**
 * Delete a project
 */
export const deleteProject = async (req, res) => {
  const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json({ message: 'Project deleted' });
};
