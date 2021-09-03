FROM node:16.8.0-alpine3.13
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 4200
CMD ["npm", "start"]
