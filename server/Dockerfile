# FROM node:18-alpine
FROM --platform=linux/amd64 node:18-alpine

RUN apk add --update --no-cache openssl1.1-compat

WORKDIR /var/express

COPY package*.json /var/express
RUN yarn install

COPY . /var/express/

RUN yarn prisma generate

CMD ["sh", "-c", "yarn migrate && yarn dev"]