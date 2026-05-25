const Project = require("../models/Project");

// CREATE PROJECT
exports.createProject = async (
  req,
  res
) => {

  try {

    const project =
      await Project.create({
        name: req.body.name,

        description:
          req.body.description,

        createdBy: req.user.id,

        members: [req.user.id],
      });

    res.status(201).json(project);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};

// GET PROJECTS
exports.getProjects = async (
  req,
  res
) => {

  try {

    const projects =
      await Project.find()
        .populate(
          "createdBy",
          "name email role"
        )
        .populate(
          "members",
          "name email role"
        );

    res.json(projects);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE PROJECT
exports.deleteProject = async (
  req,
  res
) => {

  try {

    await Project.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Project deleted",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};

// ADD MEMBER
exports.addMember = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const { userId } = req.body;

    if (
      !project.members.includes(userId)
    ) {
      project.members.push(userId);
    }

    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.removeMember = async (
  req,
  res
) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    project.members =
      project.members.filter(
        (member) =>
          member.toString() !==
          req.params.userId
      );

    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateProject = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Update only provided fields
    if (req.body.name) {
      project.name = req.body.name;
    }

    if (req.body.description) {
      project.description =
        req.body.description;
    }

    await project.save();

    res.json(project);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};