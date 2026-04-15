const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const verifyToken = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorMiddleware");
const setupSwagger = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

//  Protected route
app.get("/api/v1/protected", verifyToken, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

setupSwagger(app);

app.use(errorHandler);

module.exports = app;