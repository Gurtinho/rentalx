FROM node:16.19.1-alpine3.17
RUN mkdir -p /usr/app
WORKDIR /usr/app

RUN rm -rf ./node_modules
RUN rm -rf package.lock.json

COPY package.json ./
RUN npm install

COPY . .
EXPOSE 3333
EXPOSE 9229

CMD cls | clear & npm run dev --inspect-brk=0.0.0.0:9229