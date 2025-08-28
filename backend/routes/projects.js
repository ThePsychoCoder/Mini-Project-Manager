import express from 'express';
import auth from '../middleware/auth.js';
import { getProjects, createProject, editProject, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

// Get all projects for user
router.get('/', auth, getProjects);

// Create project
router.post('/', auth, createProject);

// Edit project
router.put('/:id', auth, editProject);

// Delete project
router.delete('/:id', auth, deleteProject);

export default router;
