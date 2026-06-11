const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const dns = require('dns')


const peliculaRoutes = require("./routes/peliculaRoutes")
const funcionRoutes = require("./routes/funcionRoutes")
const usuarioRoutes = require("./routes/usuarioRoutes");
const authRoutes = require("./routes/authRoutes");
const reservaRoutes = require("./routes/reservaRoutes");

dotenv.config();

dns.setServers(['8.8.8.8','1.1.1.1']);

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("ReservApp API funcionando");
});

// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/peliculas", peliculaRoutes) ;
app.use("/api/funciones", funcionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reservas", reservaRoutes);



const PORT = process.env.PORT || 3000



app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

