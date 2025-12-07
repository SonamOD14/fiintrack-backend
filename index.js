const express = require("express");
const app = express();

// Home Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Home Page" });
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});