FROM node:18-alpine3.17

WORKDIR /home/node/app
RUN chown -R node:node /home/node/app

COPY package*.json ./

RUN yarn install && yarn cache clean

RUN apk update && apk add --update --no-cache \
    curl \
    rm -rf /var/cache/apk/*

COPY . .

RUN yarn build

USER node

EXPOSE 3000