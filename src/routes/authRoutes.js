const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const { body } = require("express-validator");

// REGISTER with validation
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
  ],
  register
);

//  LOGIN with validation
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required")
  ],
  login
);

module.exports = router;