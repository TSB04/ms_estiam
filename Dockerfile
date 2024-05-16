FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install -g @nestjs/cli && npm install --production --silent && mv node_modules ../

COPY . .

EXPOSE 4040

CMD ["npm", "start"]
