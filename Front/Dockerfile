FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=node /app/dist/front /usr/share/nginx/html
ENV LANG pt_BR.UTF-8

EXPOSE 150
