# Use an official Node.js runtime as the base image
FROM node:16.14.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Copy the rest of the app source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
