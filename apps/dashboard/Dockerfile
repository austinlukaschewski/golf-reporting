# Step 1: Use a Node.js base image
FROM node:23 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Install pnpm globally
RUN npm install -g pnpm

# Step 4: Copy the package.json, pnpm-lock.yaml and nx.json files
COPY package.json pnpm-lock.yaml nx.json ./

# Step 5: Install dependencies with pnpm
RUN pnpm install --frozen-lockfile

# Step 6: Copy the rest of the app files
COPY . .

# Step 7: Build the React app
RUN pnpm nx build dashboard --prod

# Step 8: Create a production image
FROM nginx:alpine

# Step 9: Copy the build output to the NGINX html directory
COPY --from=build /dist/apps/dashboard /usr/share/nginx/html

# Step 10: Expose port 80 and run NGINX
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
