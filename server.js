// import cors from "cors";

import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";

import morgan from "morgan";

// db and auth
import connectDB from "./db/connect.js";

//routers
import authRoutes from "./routes/authRoutes.js";
import flashCardsRoutes from "./routes/flashCardsRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  //   throw new Error("err");
  res.json({ msg: "Welcome!" });
});

app.get("/api/v1", (req, res) => {
  //   throw new Error("err");
  res.json({ msg: "API" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/flashCards", flashCardsRoutes);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
