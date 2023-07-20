const usuario = require("../models/usuario");
const {
  createRefreshToken,
  createTokenJWT,
  verifyToken,
  generateBasicToken,
} = require("../middleware/tokenHandle");
const { encryptPass, comparePass } = require("../middleware/encryptPass");

const authController = {
  loginJWT: async (req, res) => {
    const { nombre, password } = req.body;
    try {
      const user = await usuario.findOne({ where: { nombre } });
      if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
      const comparePassword = comparePass(password, user.password);
      if (!comparePassword)
        return res.status(400).json({ msg: "Contraseña incorrecta" });
      const accessToken = createTokenJWT({
        id: user.id,
        type: user.tipo,
        nombre: user.nombre,
      });
      // verfica el token para ser refrescado
      if (!verifyToken(accessToken))
        return res.status(400).json({ msg: "Token invalido" });
      const refreshToken = createRefreshToken({
        id: user.id,
        type: user.tipo,
        nombre: user.nombre,
      });
      res
        .status(200)
        .json({ msg: "Usuario logueado", user, accessToken, refreshToken });
    } catch (error) {
      res.status(500).json({ msg: "Error server", error });
    }
  },
  loginBasic: async (req, res) => {
    const { nombre, password } = req.body;
    try {
      const user = await usuario.findOne({ where: { nombre } });
      if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
      const comparePassword = comparePass(password, user.password);
      if (!comparePassword)
        return res.status(400).json({ msg: "Contraseña incorrecta" });
      const token = generateBasicToken(nombre, password);
      res.status(200).json({ msg: "Usuario logueado", user, token });
    } catch (error) {
      res.status(500).json({ msg: "Error server", error });
    }
  },
  register: async (req, res) => {
    const { nombre, password, tipo } = req.body;
    if (!nombre || !password || !tipo) {
      return res.status(400).json({ msg: "Debe llenar todos los campos" });
    }
    try {
      const existingUser = await usuario.findOne({ where: { nombre } });
      if (existingUser) {
        return res.status(401).json({ msg: "El usuario ya existe" });
      }
      const newPassword = encryptPass(password);
      const user = await usuario.create({
        nombre,
        password: newPassword,
        tipo,
      });
      res.status(201).json({ msg: "Usuario creado", user });
    } catch (error) {
      res.status(500).json({ msg: "Error server", error });
    }
  },
};

module.exports = authController;
