const Expense = require("../models/ExpenseModel");

/**
 * GET RECENT EXPENSES
 * Returns last 5 expenses (latest first)
 */
const getRecentExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      order: [["expenseDate", "DESC"]],
      limit: 5
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching recent expenses",
      error: error.message
    });
  }
};

/**
 * GET ALL EXPENSES
 * Returns all expenses (can be used for View All page)
 */
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      order: [["expenseDate", "DESC"]]
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching expenses",
      error: error.message
    });
  }
};

/**
 * CREATE NEW EXPENSE
 * Adds a new expense to database
 */
const createExpense = async (req, res) => {
  try {
    const {
      title,
      amount,
      type,
      category,
      expenseDate,
      note,
      userId
    } = req.body;

    const expense = await Expense.create({
      title,
      amount,
      type,
      category,
      expenseDate,
      note,
      userId
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Error creating expense",
      error: error.message
    });
  }
};

module.exports = {
  getRecentExpenses,
  getAllExpenses,
  createExpense
};