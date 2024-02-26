FROM node:18-alpine as build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./frontend .
RUN npm install
RUN npm run build

FROM node:18-alpine
RUN apk --no-cache add nginx
ADD ./standalone/nginx/nginx.conf /etc/nginx/nginx.conf
ADD ./standalone/nginx/default.conf /etc/nginx/conf.d/default.conf
ADD ./standalone/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh
COPY --from=build /usr/src/app/build /var/www/app/
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./backend .
RUN npm install
EXPOSE 80
CMD ["start.sh"]
