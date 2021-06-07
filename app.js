const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const redis = require("redis");
let RedisStore = require("connect-redis")(session);

const app = express();
dotenv.config();

const { MONGO_USER, MONGO_PASSWORD, MONGO_PORT, MONGO_IP, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");

let RedisClient = redis.createClient({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT

});



const PORT = process.env.PORT || 4000;

const MONGO_URL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/?authSource=admin`;


const connectWithRetry = () => {
    mongoose
        .connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((err) => {
            console.log("error here", err.message)
            setTimeout(connectWithRetry, 5000)
        });
}

connectWithRetry();

app.enable("trust proxy"); // trust some header nginx proxy will add into our requests
app.use(session({
    store: new RedisStore({
        client: RedisClient
    }),
    secret: process.env.SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false,
}))
app.use(cors());
app.use(express.json());


const todo_routes = require("./routes/routes");
app.use("/api", todo_routes);


app.listen(PORT, () => console.log(`App listening on PORT:${PORT}`));