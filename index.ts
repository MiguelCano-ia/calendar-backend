import authRouter from "./routes/auth";
import dbConnection from "./db/config";
import express from "express";
import cors from "cors";

// Create express server
const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Public directory
app.use(express.static("public"));

// Read and parse body
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);

// Listen requests
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
