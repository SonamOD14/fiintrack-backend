const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/Database");

const Expense = sequelize.define("ExpenseModel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },

  type: {
    type: DataTypes.ENUM("expense", "income"),
    defaultValue: "expense",
    allowNull: false
  },

  category: {
    type: DataTypes.ENUM(
      "Food",
      "Transport",
      "Shopping",
      "Entertainment",
      "Healthcare",
      "Bills"
    ),
    allowNull: false
  },

  expenseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  note: {
    type: DataTypes.STRING
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "expenses",
  timestamps: true
});

module.exports = Expense;
