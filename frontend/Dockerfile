FROM node:21-alpine as build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /var/www/app/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
