import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import expenseRouter from "./routes/expense.js";
import cors from "cors";
const app = express();
const PORT = 8080;

app.use(cors());

app.get("/", (req, res) => {
  res.json({"message :" : "Hello world"});
});

mongoose
  .connect(
    "mongodb+srv://root:localhost@chandan.inpyroj.mongodb.net/expense_tracker"
  )
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.error("Error while connecting mongodb", err));

app.use(express.json());
app.use("/api/users/", userRouter);
app.use("/api/expenses/", expenseRouter);
app.listen(PORT, () => console.log("App is running"));
