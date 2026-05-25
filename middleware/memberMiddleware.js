const Project = require("../models/Project");

const memberMiddleware = async (
  req,
  res,
  next
) => {

  try {

    const project =
      await Project.findById(
        req.body.projectId ||
        req.params.projectId
      );

    if (!project) {

      return res.status(404).json({
        message:
          "Project not found",
      });
    }

    const isMember =
      project.members.includes(
        req.user.id
      );

    if (!isMember) {

      return res.status(403).json({
        message:
          "Access denied",
      });
    }

    next();

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports =
  memberMiddleware;