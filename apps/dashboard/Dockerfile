# Stage 1: Build the application
FROM node:23-alpine AS builder
RUN npm i -g pnpm@latest
WORKDIR /app
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY apps/dashboard ./apps/dashboard
COPY libs/shared/ui ./libs/shared/ui
RUN pnpm i --no-frozen-lockfile --ignore-scripts
RUN npx nx build dashboard --prod

# Stage 2: Serve the application with nginx
FROM nginx:alpine
COPY --from=builder /dist/apps/dashboard /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
