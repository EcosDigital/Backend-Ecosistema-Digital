import app from "./app.js"
import { PORT } from "./config.js";
//puerto de escucha for the servidor
app.listen(PORT)
console.log('Servidor en el puerto', PORT);