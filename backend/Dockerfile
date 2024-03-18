FROM node:21-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install --only=production
COPY . .
RUN npm install
EXPOSE 4000
CMD ["node", "index.js"]
