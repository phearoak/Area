FROM node:18-alpine

WORKDIR /var/react

COPY package*.json /var/react
RUN yarn install

COPY . /var/react/

CMD ["yarn", "start"]