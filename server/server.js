const express = require("express");
const connectMongoDB = require("./config/db");

const app = express();

// Connect Database
connectMongoDB();

// Initialize Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("<h1>MERN App</h1>");
});

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/issues", require("./routes/api/issues"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
