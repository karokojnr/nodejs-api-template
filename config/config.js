module.exports = {
    MONGO_IP: process.env.MONGO_IP || "mongo",
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: "root",
    MONGO_PASSWORD: "example",
    REDIS_URL: process.env.REDIS_URL || "redis",
    REDIS_PORT: process.REDIS_PORT || 6379,
    SESSION_SECRET: process.env.SESSION_SECRET
}