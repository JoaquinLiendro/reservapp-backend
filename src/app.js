const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Usuario = require("./models/Usuario");

dotenv.config();

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

/*mongoose.connection.once("open", async () => {
  await Usuario.create({
    nombre: "Joaquin",
    email: "joaquin@test.com",
  });

  console.log("Usuario creado");
});*/
