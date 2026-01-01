const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const { verifyToken } = require("../middleware/authMiddleware"); // JWT auth

// All routes are protected
router.use(verifyToken);

router.post("/", expenseController.addExpense);
router.get("/", expenseController.getExpenses);
router.put("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;