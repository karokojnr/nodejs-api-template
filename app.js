const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);

const app = express();
dotenv.config();

const { MONGO_DB_URL, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");

const RedisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT

});


const PORT = process.env.PORT || 4000;

const MONGO_URL = `${MONGO_DB_URL}/?authSource=admin`;


const connectWithRetry = async () => {
    try {
        await mongoose
            .connect(MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
        console.log("Successfully connected to database");
    } catch (error) {
        console.log("error connecting to the database", err)
        setTimeout(connectWithRetry, 5000)
    }
}

connectWithRetry();

// trust some header nginx proxy will add into our requests
app.enable("trust proxy");

app.use(session({
    store: new RedisStore({
        client: RedisClient
    }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false,
}));

app.use(cors());
app.use(express.json());


const todo_routes = require("./routes/routes");
app.use("/v1/api", todo_routes);


app.listen(PORT, () => console.log(`App listening on PORT:${PORT}`));