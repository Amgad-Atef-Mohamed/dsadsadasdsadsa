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
  },
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    "port": process.env.REDIS_PORT || 6379,
    "password": process.env.REDIS_PASS || ''
  },
  mailing: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    from: process.env.MAIL_USED_TO_SEND_EMAILS,
    auth: {
      user: process.env.MAIL_USED_TO_SEND_EMAILS, // generated ethereal user
      pass: process.env.MAIL_USED_TO_SEND_EMAILS_Password // generated ethereal password
    }
  },
  frontEndOrigin: process.env.FRONT_END_ORIGIN || 'http://127.0.0.1:8000',
  TTL_FOR_OTP: 120,
  JWT: {
    SECRET: process.env.JWT_SECRET_KEY || 'TEST',
    TTL: 86400000 // 1day in milliseconds
  },
};
