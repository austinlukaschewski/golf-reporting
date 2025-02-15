# Step 1: Use an official Node.js image as the base
FROM node:23 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and nx.json files, and install dependencies
COPY package.json nx.json ./
COPY libs/shared/ui/package.json libs/shared/ui/package.json

RUN npm install --no-frozen-lockfile --ignore-scripts

# Step 4: Copy the rest of the application files
COPY . .

# Step 5: Build the app (build the dashboard app)
RUN npx nx build dashboard --prod

# Step 6: Create a new stage for the production image
FROM nginx:alpine

# Step 7: Copy the build files from the build stage into the NGINX server directory
COPY --from=build /app/dist/apps/dashboard /usr/share/nginx/html

# Step 8: Expose port 80 to be able to access the app
EXPOSE 4200

# Step 9: Start NGINX
CMD ["nginx", "-g", "daemon off;"]
