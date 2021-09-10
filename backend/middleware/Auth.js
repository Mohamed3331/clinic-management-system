const jwt = require('jsonwebtoken')
const Admin = require('../models/adminUser')

const auth = async (req, res, next) => {
    let token
    let admin
    try {
        token = req.header('Authorization').replace('Bearer ', '')

        admin = await Admin.findById(req.header('AdminID'))

        jwt.verify(token, 'thisisasecretjwt')
        
        if (!admin || !token) {
            throw new Error()
        }
        
        next()
    } catch (e) {
        if (e.message === 'jwt expired') {
            admin.tokens = admin.tokens.filter((tok) => {
                return tok.token !== token
            })
            await admin.save()
            res.send({message: e.message})
        } else {
            res.send({message: "Please Authenticate"})
        }
    }
}

module.exports = auth