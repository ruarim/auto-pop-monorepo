# Base image
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn build

# Run app
CMD [ "yarn", "start" ]

EXPOSE 3000




