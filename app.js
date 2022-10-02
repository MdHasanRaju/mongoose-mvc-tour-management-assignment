const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());

// routes
const packageRoutes = require("./routes/package.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use("/api/v1/tour", packageRoutes);

module.exports = app;