const dotenv = require("dotenv");
const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const connectDB = require("./connectDatabase/connectDatabase.js");
const cors = require("cors");
const milkManRoute = require("./routes/milkManRoutes");
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: " many requests this IP,  try again after 15 minutes",
});

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/yes", (req, res) => {
  console.log("server is runnning");
});

app.use("/api", apiLimiter);
app.use("/api/milkMan", milkManRoute);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server is running on localhost://${process.env.PORT}`);
});
