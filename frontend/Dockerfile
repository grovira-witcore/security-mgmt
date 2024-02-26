FROM node:18-alpine as build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /var/www/app/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
