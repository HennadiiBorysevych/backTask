const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();


const postRouter = require("./routes/api/posts");



const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(formatsLogger));
app.use(cors());

app.use(express.json());


app.use("/api/landmarks", postRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});

module.exports = app;