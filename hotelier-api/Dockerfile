FROM node:14
# Create app directory
# RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json ./
RUN npm ci 
# Bundle app source
COPY . .
EXPOSE 4000
CMD [ "node", "index.js" ]