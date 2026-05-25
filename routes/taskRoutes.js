const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const memberMiddleware = require(
  "../middleware/memberMiddleware"
);

const {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
} = require(
  "../controllers/taskController"
);

// CREATE TASK
router.post(
  "/",
  authMiddleware,
  memberMiddleware,
  createTask
);

// GET TASKS
router.get(
  "/project/:projectId",
  authMiddleware,
  getTasksByProject
);

// UPDATE TASK
router.put(
  "/:id",
  authMiddleware,
  updateTask
);

// DELETE TASK
router.delete(
  "/:id",
  authMiddleware,
  deleteTask
);

module.exports = router;