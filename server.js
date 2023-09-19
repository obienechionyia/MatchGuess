import express from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";
import * as dotenv from "dotenv";
import matchRouter from "./routers/matchRouter.js";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 5100;

app.use(express.json());

app.use("/api/v1/matches", matchRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// not found middleware
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// error middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

app.use(errorHandlerMiddleware);
