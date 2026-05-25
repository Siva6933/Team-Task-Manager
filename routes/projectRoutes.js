const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const adminMiddleware = require(
  "../middleware/adminMiddleware"
);

const {
  createProject,
  getProjects,
  deleteProject,
  addMember,
  removeMember,
  updateProject,
} = require(
  "../controllers/projectController"
);

// CREATE PROJECT
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createProject
);

// GET PROJECTS
router.get(
  "/",
  authMiddleware,
  getProjects
);

// ADD MEMBER
router.put(
  "/:id/add-member",
  authMiddleware,
  adminMiddleware,
  addMember
);

// REMOVE MEMBER
router.put(
  "/:id/remove-member/:userId",
  authMiddleware,
  adminMiddleware,
  removeMember
);

// UPDATE PROJECT
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateProject
);

// DELETE PROJECT
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProject
);

module.exports = router;