const express = require("express");
const verificarToken = require("../middleware/authMiddleware");

const router = express.Router();

const { login, perfil } = require("../controllers/authController");

router.post("/login", login);
router.get(
    "/perfil",
    verificarToken,
    perfil
);

module.exports = router;