const usuario = require("../models/usuario");
const { sign, verify, decode } = require("jsonwebtoken");
const { comparePass } = require("./encryptPass");


const secret = "mySecretToken";
const accessTokenExpiration = "6h";

const checkType = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const type = authHeader && authHeader.split(" ")[0];
  if (!token) return res.status(401).json({ msg: "No se encontró token" });
  try {
    if (type === "Basic") {
      const decoded = Buffer.from(token, "base64").toString("ascii");
      const [username, password] = decoded.split(":");
      usuario
        .findOne({ where: { nombre: username } })
        .then((user) => {
          if (!user) {
            return res.sendStatus(403);
          } else {
            const comparePassword = comparePass(password, user.password);
            if (!comparePassword)
              return res.status(400).json({ msg: "Contraseña incorrecta" });
            if (user.dataValues.tipo === "NORMAL") {
              return res.status(401).json({ msg: "No estas autorizado" });
            }
            req.user = user;
            console.log(user.dataValues.tipo);
            next();
          }
        })
        .catch((error) => {
          res.status(500).json({ message: "Internal server error" });
        });
    } else if (type === "Bearer") {
      const decoded = verify(token, secret);
      if (decoded.type === "NORMAL")
        return res.status(401).json({ msg: "No estas autorizado" });
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401).json({ msg: "Token invalido" });
  }
};
// para autenticar el token
function authenticateToken(request, response, next) {
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith("Basic")) {
        return response.sendStatus(401);
    }

    const basicToken = authHeader.slice(6);

    const decoded = Buffer.from(basicToken, 'base64').toString('ascii');
    const [username, password] = decoded.split(':');
    console.log("middlewares", decoded);
    usuario
        .findOne({ where: {nombre: username }})
        .then((user) => {
            if (!user) {
                return response.sendStatus(403);
            }   else {
                const comparePassword = comparePass(password, user.password);
                if (!comparePassword)
                    return response.status(400).json({ msg: "Contraseña incorrecta"});
                if (user.dataValues.tipo === "NORMAL") {
                    return response.status(401).json({ msg: "No estas autorizado"});
                }
                request.user = user;
                console.log(user.dataValues.tipo);
                next();
            }
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({ message: "Internal server error"});
        });
}

// generear un token basico
function generateBasicToken(username, password) {
   const token = `${username}:${password}`;
   const base64Token = Buffer.from(token, 'utf-8').toString('base64');
   const basicToken = `${base64Token}`;
   return basicToken;
}

// token jwt
const createTokenJWT = (payload) => {
    return sign(payload, secret, {expiresIn: accessTokenExpiration});
};

const createRefreshToken = (payload) => {
    return sign(payload, secret, { expiresIn: '6d'});
};

const verifyToken = (token) => {
    try {
        const decoded = verify(token, secret);
        return decoded
    } catch (error) {
        throw new Error('Token Invalido');
    }
};

module.exports = {
    createTokenJWT,
    createRefreshToken,
    verifyToken,
    checkType,
    authenticateToken,
    generateBasicToken,
};