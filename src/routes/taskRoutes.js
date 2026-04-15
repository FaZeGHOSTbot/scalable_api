const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// all routes protected
router.use(verifyToken);

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);

// 🔥 ADMIN ONLY DELETE
router.delete("/:id", isAdmin, deleteTask);

module.exports = router;