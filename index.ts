import express from "express";
import authRouter from "./routes/auth";

//Crear el servidor de express
const app = express();

// Directorio publico
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/auth", authRouter);

// Escuchar peticiones
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
