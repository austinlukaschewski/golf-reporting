FROM node:23-alpine AS build

COPY package*.json ./
RUN npm i -g pnpm@latest

RUN npm i
COPY . .
RUN npx nx build dashboard --prod

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/apps/dashboard ./
RUN sed -i '10i \\ttry_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf

EXPOSE 4200
USER 1000
ENTRYPOINT ["nginx", "-g", "daemon off;"]