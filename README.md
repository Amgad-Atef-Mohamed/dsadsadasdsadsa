A simple Real time chat usig an OOP-oriented Typescript express,redis,mongodb,socket.io

## Requirements
- Node
- Typescript
- npm
- redis
- mongo

## Installation
- clone repo

`git clone https://github.com/Amgad-Atef-Mohamed/real-time-chat.git`

- Install Dependencies

`npm install`

## Run it !
- open default config file and edit it according to your environment or start server using  `npm start` with some environment variables

`NODE_ENV=development`

`PORT=1337`

`REDIS_HOST=127.0.0.1`

`REDIS_PORT=6379`

`REDIS_PASS=`

`MONGO_HOST=127.0.0.1`

`MONGO_PORT=27017`

`MONGO_USER=`

`MONGO_PASS=`

`JWT_SECRET_KEY=test`

`MAIL_USED_TO_SEND_EMAILS=test@test.com`

`MAIL_USED_TO_SEND_EMAILS_Password=test`

`FRONT_END_ORIGIN=127.0.0.1:8000`

## Run It using docker-compose
- one project root dir 
- open docker-compose.yml file 
- edit environment variables for back-end service mentioned in previous section according to your environment
- `docker-compose up`
