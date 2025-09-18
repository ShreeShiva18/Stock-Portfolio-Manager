const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");

// Import Routes
const investorRoutes = require("./routes/investorRoutes");
const nomineeRoutes = require("./routes/nomineeRoutes");
const bankRoutes = require("./routes/bankRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const stockRoutes = require("./routes/stockRoutes");
const companyRoutes = require("./routes/companyRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test Database Connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
  } else {
    console.log("Connected to the MySQL database.");
  }
});

// Routes
app.use("/api/investors", investorRoutes);
app.use("/api/nominees", nomineeRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/transactions", transactionRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
