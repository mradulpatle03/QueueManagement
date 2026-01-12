const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routes/auth.route")
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middlewares/error.middleware.js");
dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 300, 
}));

// Test route
app.get("/", (req, res) => {
  res.send("Queue Management System Backend Running");
});
app.use("/api/auth", userRouter);


app.use(errorHandler);

// MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
