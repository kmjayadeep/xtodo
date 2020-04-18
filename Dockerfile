# https://hub.docker.com/_/node/
FROM node:13.10.1-alpine3.11

LABEL authors="Jayadeep KM <kmjayadeep@gmail.com>"

WORKDIR /app/src

RUN apk update && apk upgrade

COPY package*.json ./
RUN npm install

# Remove cache and tmp files
RUN rm -rf /var/cache/apk/* && rm -rf /tmp/*

# Xtodo server port
EXPOSE 3000
# Node.js inspector agent port (https://nodejs.org/en/docs/guides/debugging-getting-started/)
EXPOSE 9229

COPY . .

RUN npm run client:build

CMD [ "npm", "start" ]
