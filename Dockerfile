FROM node:alpine

WORKDIR /usr/app

COPY . .

CMD ["node", "app.js"]