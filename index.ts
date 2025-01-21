import authRouter from "./routes/auth";
import eventsRouter from "./routes/events";
import dbConnection from "./db/config";
import express from "express";
import cors from "cors";

const app = express();

dbConnection();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/events", eventsRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
