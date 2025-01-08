import express from "express";
import morgan from "morgan";
import cors from "cors";

import { pool } from "./db.js";
import { FRONTEND_URL } from "./config.js";

//importar rutas de trabajo
import generalRoutes from "./routes/app.routes.js"

//inicializacion del servidor
const app = express();
//configuracion de cors
app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);

//visualiza peticiones server por console
app.use(morgan("dev"));
app.use(express.json());

// Verificar conexión exitosa o errores
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error al conectarse a la base de datos:", err.stack);
  } else {
    console.log(">>> Base de datos conecctada");
    release(); // Libera el cliente para que vuelva al pool
  }
});

//usar los modulos de las rutas (end ponit)
app.use("/api", generalRoutes);

export default app;
