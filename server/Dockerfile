FROM node:16.13-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

RUN npx prisma migrate deploy && npx prisma generate

RUN yarn build

CMD ["node", "dist/src/main.js"]