import express from "express";
import dotenv from "dotenv";
import DbConnection from "./connection/dbConnetion.js";
import route from "./router/routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", route);
dotenv.config();
app.use("/upload", express.static("upload"));

// error massage middleware function
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const massage = err.massage || "Something wrong";
  return res.status(status).json({ sucess: false, status, massage });
});

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(process.env.port, () => {
  DbConnection();
  console.log(`Server is running ${process.env.port}`);
});







