FROM node:18-alpine

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]