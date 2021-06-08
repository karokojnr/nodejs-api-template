module.exports = {
    MONGO_IP: process.env.MONGO_IP || "mongo",
    MONGO_PORT: process.env.MONGO_PORT || 27018,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    REDIS_URL: process.env.REDIS_URL || "redis",
    REDIS_PORT: process.REDIS_PORT || 6379,
    SESSION_SECRET: process.env.SESSION_SECRET
}