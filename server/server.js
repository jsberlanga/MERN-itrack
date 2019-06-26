const express = require("express");
const connectMongoDB = require("./config/db");

const app = express();

// Connect Database
connectMongoDB();

// Initialize Middleware
app.use(express.json({ extended: false }));

// Handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "*");
    return res.status(200).json({});
  }
  next();
});

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/issues", require("./routes/api/issues"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
