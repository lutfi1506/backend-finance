import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter";

dotenv.config();
const app: Express = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response): void => {
  res.json({ msg: "server success" });
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`API listen on port ${PORT}`);
});
