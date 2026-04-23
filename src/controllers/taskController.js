const Task = require("../models/Task");
const {
  buildKey,
  getCachedTasks,
  setCachedTasks,
  clearUserTaskCache
} = require("../utils/taskCache");

// CREATE
exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.id
    });

    clearUserTaskCache(req.user.id);

    res.status(201).json(task);
  } catch (error) {
    next(error); //  use global error handler
  }
};

// GET ALL
exports.getTasks = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
    const skip = (page - 1) * limit;
    const search = (req.query.search || "").trim();
    const sortBy = ["createdAt", "updatedAt", "title"].includes(req.query.sortBy)
      ? req.query.sortBy
      : "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const filter = { userId: req.user.id };
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const cacheKey = buildKey(req.user.id, {
      page,
      limit,
      search,
      sortBy,
      order
    });

    const cached = getCachedTasks(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }

    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit)
        .select("title description createdAt updatedAt")
        .lean(),
      Task.countDocuments(filter)
    ]);

    const payload = {
      data: tasks,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };

    setCachedTasks(cacheKey, payload);

    res.status(200).json(payload);
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

    // handle not found
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    clearUserTaskCache(req.user.id);

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

    // handle not found
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    clearUserTaskCache(req.user.id);

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};