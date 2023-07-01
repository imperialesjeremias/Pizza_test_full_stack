const usuario = require('../models/usuario')
const { createRefreshToken, createToenJWT, verifyToken, generateBasicToken} =  require('../middleware/tokenHandle')
const {encryptPass, comparePass} = require('../middleware/encryptPass')

const authController = {
    loginJWT: async (request, response) => {
        const {nombre, password} = request.body
        try {
            const user = await usuario.findOne({where: {nombre}})
            if(!user) return response.status(404).json({msg: 'Usuario no encontrado'})
            const comparePassword = comparePass(password, user.password)
            if(!comparePassword) return response.status(400).json({msg: user.id, type: user, tipo, nombre: user.nombre})
            // verfica el token para ser refrescado
            if(!verifyToken(accessToken)) return response.status(400).json({msg: 'Token Invalidop'})
            const refreshToken = createRefreshToken({id: user.id, type: user.tipo, nombre: user.nombre})
            response.status(200).json({msg: 'Usuario Logueado', user, accessToken, refreshToken})
        } catch(error) {
            response.status(500).json({msg: 'Error server', error})
        }
    },
    loginBasic: async (request, response) => {
        const { nombre, password} = request.body
        try {
            const user = await usuario.findOne({where: {nombre}})
            if(!user) return response.status(404).json({msg: 'Usuario no encontrado'})
            const comparePassword = comparePass(password, user.password)
            if(!comparePassword) return response.status(400).json({ msg: 'Contraseña iuncrorecta'})
            const token = generateBasicToken(nombre, password)
            response.status(200).json({msg: 'Usuario logueado', user, token})
        } catch (error){ 
            response.status(500).json({msg: 'Error server', error})
        }
    },
    register: async (request, response) => {
        const { nombre, password, tipo } = request.body;
        if(!nombre || !password || !tipo) {
            return response.status(400).json({msg: 'Debe llenar todos los campos'})
        }
        const newPassword = encryptPass(password);
        try {
        const user = await usuario.create({nombre, password: newPassword, tipo})
        response.status(201).json({msg: 'Usuario creado', user});
        } catch (error) {
            response.status(500).json({msg: 'Error server', error});
        }
    }
}

module.exports = authController;