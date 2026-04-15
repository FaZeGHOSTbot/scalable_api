const Task = require("../models/Task");

// CREATE
exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    next(error); // ✅ use global error handler
  }
};

// GET ALL
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// UPDATE
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    // ✅ handle not found
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// DELETE
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    // ✅ handle not found
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};