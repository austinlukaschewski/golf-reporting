# Stage 1: Build the application
FROM node:23-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY libs ./libs
RUN npm install
COPY apps/dashboard ./apps/dashboard
COPY libs/shared/ui ./libs/shared/ui
RUN npx nx build dashboard --prod

# Stage 2: Serve the application with nginx
FROM nginx:alpine
COPY --from=builder /app/dist/apps/dashboard /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
