const config = require('../config/config')
const { isValidPassword, hashPassword} = require('../utils/hashing')

class JwtServices {

    constructor(dao) {
        this.dao = dao
    }

    async login(email, password) {
        let user
        if (email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD) {
            // Datos de sesión para el usuario coder Admin
            user = {
                first_name: "Usuario",
                last_name: "de CODER",
                age: 21,
                email: config.ADMIN_EMAIL,
                cart: null,
                rol: "admin",
                _id: "jh235hlki23463nkhlo"
            }
        }
        else if (email === config.SUPER_ADMIN_EMAIL && password === config.SUPER_ADMIN_PASSWORD) {
            // Datos de sesión para el usuario coder Admin
            user = {
                first_name: "Usuario",
                last_name: "de CODER",
                age: 40,
                email: config.SUPER_ADMIN_EMAIL,
                cart: null,
                rol: "superadmin",
                _id: "kflshGKSGNasbsgj3dae"
            }
        }
        else {
            user = await this.dao.findByEmail(email)
            if (!user) {
                //res.sendNotFoundError(err)
                //return res.status(404).json({ error: 'User not found!' })
                throw new Error('not found')
            }

            if (!isValidPassword(password, user.password)) {
                //return send.sendUnauthorized('Invalid password')
                //return res.status(401).json({ error: 'Invalid password' })
                throw new Error('invalid password')
            }
        }
        return user
    }

    async validarPassRepetidos (email, password) {
        let user
        user = await this.dao.findByEmail({email})
        console.log(hashPassword(password))
        console.log(user.password)
        if (isValidPassword(hashPassword(password), user.password)) {  // misma contraseña que la anterior
            throw new Error('Contraseña inválida, la nueva contraseña no puede ser igual a la contraseña anterior')
        }
        return user
    }
}

module.exports = { JwtServices }