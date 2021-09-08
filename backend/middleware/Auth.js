const jwt = require('jsonwebtoken')
const Admin = require('../models/adminUser')

const auth = async (req, res, next) => {
    
    try {
        const token = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.verify(token, 'thisisasecretjwt')
        const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log(admin);
        
        if (!admin) {
            throw new Error()
        }
        
        req.token = token
        req.admin = admin
        next()
    } catch (e) {
        res.status(401).send({ message: 'Please authenticate.' })
    }
}

module.exports = auth