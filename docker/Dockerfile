FROM node:12.16.1-alpine

RUN mkdir -p /app

WORKDIR /app

RUN npm install -g pm2

COPY package.json /app

RUN npm install

# Bundle app source
COPY . /app

EXPOSE 3000

CMD npm start
