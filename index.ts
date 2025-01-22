import authRouter from "./routes/auth";
import eventsRouter from "./routes/events";
import dbConnection from "./db/config";
import express from "express";
import cors from "cors";
import path from "path";

const app = express();

dbConnection();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/events", eventsRouter);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
