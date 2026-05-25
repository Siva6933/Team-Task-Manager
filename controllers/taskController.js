const Task = require("../models/Task");
const Project = require("../models/Project");

// CREATE TASK
exports.createTask = async (
  req,
  res
) => {

  try {

    const {
      title,
      description,
      status,
      priority,
      projectId,
      assignedTo,
      dueDate,
    } = req.body;

    // VALIDATIONS
    if (!title) {

      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!projectId) {

      return res.status(400).json({
        message:
          "Project ID is required",
      });
    }

    // CHECK PROJECT
    const project =
      await Project.findById(
        projectId
      );

    if (!project) {

      return res.status(404).json({
        message:
          "Project not found",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      projectId,
      assignedTo,
      dueDate,
      createdBy: req.user.id,
    });

    res.status(201).json(task);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};

// GET TASKS BY PROJECT
exports.getTasksByProject =
  async (req, res) => {

    try {

      const tasks =
        await Task.find({
          projectId:
            req.params.projectId,
        })
          .populate(
            "assignedTo",
            "name email role"
          )
          .populate(
            "createdBy",
            "name email"
          );

      res.json(tasks);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });
    }
  };

// UPDATE TASK
exports.updateTask = async (
  req,
  res
) => {

  try {

    const task =
      await Task.findById(
        req.params.id
      );

    if (!task) {

      return res.status(404).json({
        message:
          "Task not found",
      });
    }

    // UPDATE
    Object.assign(task, req.body);

    await task.save();

    res.json(task);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE TASK
exports.deleteTask = async (
  req,
  res
) => {

  try {

    const task =
      await Task.findById(
        req.params.id
      );

    if (!task) {

      return res.status(404).json({
        message:
          "Task not found",
      });
    }

    await task.deleteOne();

    res.json({
      message:
        "Task deleted",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};