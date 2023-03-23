FROM node:12-bullseye
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
WORKDIR /usr/app
RUN npm install -g http-server

