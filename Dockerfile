FROM node:20.11.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install discord.js mysql2 dotenv

COPY . .

ENV BOT_TOKEN=

ENV GUILD_ID=

ENV CLIENT_ID=

ENV MYSQL_HOST=

ENV MYSQL_USER=

ENV MYSQL_PASSWORD=

ENV MYSQL_DATABASE=

CMD [ "npm", "start" ]