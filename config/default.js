module.exports = {
  "port": process.env.PORT || 1337,
  "database": {
    "name": "real-time-chat",
    "host": process.env.MONGO_HOST || "localhost",
    "port": process.env.MONGO_PORT || 27017,
    "user": process.env.MONGO_USER || '',
    "pw": process.env.MONGO_PASS || ''
  },
  mongoose: {
    debug: true,
    autoIndex: true
  }
};
