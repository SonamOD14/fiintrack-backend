const { Expense } = require("../models");

// Add new expense
exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, expenseDate, note } = req.body;
    const userId = req.user.id; // from JWT middleware

    const expense = await Expense.create({
      userId,
      title,
      amount,
      category,
      expenseDate,
      note
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add expense" });
  }
};

// Get all expenses for logged-in user
exports.getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.findAll({ where: { userId }, order: [['expenseDate', 'DESC']] });
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, amount, category, expenseDate, note } = req.body;

    const expense = await Expense.findOne({ where: { id, userId } });
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    await expense.update({ title, amount, category, expenseDate, note });
    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update expense" });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await Expense.findOne({ where: { id, userId } });
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    await expense.destroy();
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete expense" });
  }
};