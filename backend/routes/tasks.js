import express from 'express';
import auth from '../middleware/auth.js';
import { getTasks, createTask, editTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

// Get tasks for a project (with filter/sort)
router.get('/:projectId', auth, getTasks);

// Create task
router.post('/:projectId', auth, createTask);

// Edit task
router.put('/:taskId', auth, editTask);

// Delete task
router.delete('/:taskId', auth, deleteTask);

export default router;
