# Stage 1: Build the React app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app
FROM node:18-alpine

# Install serve globally
RUN npm install -g serve

# Copy the built React app from the previous stage
COPY --from=build /app/dist /app

# Set the working directory
WORKDIR /app

# Expose port 3000
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", ".", "-l", "3000"]
