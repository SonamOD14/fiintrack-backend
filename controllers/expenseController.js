const Expense = require("../models/ExpenseModel");

exports.getRecentExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};