
require('dotenv').config()
const MONGODB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jpvlo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`


module.exports = MONGODB_URL