const express = require('express');
const cors = require("cors")
const app = express()
const rotas = require("./routes/router.js");

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)

const corOP = {
    origin: true,
    credentials: true,

    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}

app.use(cors(corOP))
app.options("*", cors(corOP))

//Enable CORS for all HTTP methods
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token"
    )
    next()
})


app.use("/", rotas);

app.listen(3000, () => {
    console.log('Api Rodando');
});