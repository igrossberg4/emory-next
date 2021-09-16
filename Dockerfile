FROM node:12
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
# Prepare for production if required.
# COPY . .
RUN npm run build
RUN npm install -g http-server

EXPOSE 3000
# Default to dev command
CMD ['npm', 'run', 'dev']
