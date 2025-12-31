const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/Database");

const Expense = sequelize.define(
  "ExpenseModel",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false
    },

    expenseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    note: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: "expenses",
    timestamps: true
  }
);

module.exports = Expense;