const express = require("express");
const app = express();
const { sequelize, connectDB } = require("./db/Database");

//middleware
app.use(express.json());

// userRoutes
app.use("/api/user", require('./routes/UserRouter'));

app.use("/api/expense", require("./routes/ExpenseRouter"));

// test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Home Page" });
});

//start server
const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  await connectDB();

  // Load models and relationships
  require("./models");

  // Sync DB
  await sequelize.sync({ alter: true });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();