FROM node:16-alpine

RUN apk add --no-cache python3 g++ make curl

RUN npm i -g @nestjs/cli

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN apk --no-cache --virtual build-dependencies add \
        make \
        g++

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN apk del build-dependencies

RUN yarn build

EXPOSE 3000
