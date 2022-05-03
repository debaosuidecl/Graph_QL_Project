const express = require("express");

const app = express();
const mongoose = require("mongoose");
const { graphqlHTTP } = require('express-graphql');
const { config } = require("dotenv")
const resolver = require('./graphql/resolvers/index')
const schema = require('./graphql/schema/index');
const isAuth = require("./middlewares/is-auth")
config();
const mongouri = process.env.MONGO_URI
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === "OPTIONS") {
        return res.sendStatus(200)
    }
    next()
})
app.use(isAuth)


app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
}))


const PORT = 8000
mongoose.connect(mongouri).then(res => {
    console.log("mongo connected")
    app.listen(PORT, () => {
        console.log(`listening on port: ${PORT}`)
    })
}).catch(err => {
    console.log(err)
})
