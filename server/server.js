const express = require("express");
const cors = require("cors");
const path = require("path");


const app = express();

// ✅ Enable CORS for your frontend
app.use(
  cors({
    origin: "http://localhost:5173", // your React app
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const detectRoutes = require('./routes/detect');
const cropsRoutes = require('./routes/cropsSuggestion');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/detect", detectRoutes);
app.use('/crops', cropsRoutes)

// Root route
app.get("/", (req, res) => {
  res.send("Express server is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
