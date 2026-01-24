const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const { verifyToken } = require("../middleware/authMiddleware");

// Protect all expense routes
router.use(verifyToken);

// Dashboard
router.get("/recent", expenseController.getRecentExpenses);

// Expenses
router.get("/", expenseController.getAllExpenses);
router.post("/", expenseController.createExpense);

module.exports = router;