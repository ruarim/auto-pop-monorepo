# Base image
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the container
COPY package.json ./
COPY yarn.lock ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY packages/depop-utils/package.json ./packages/depop-utils/package.json

# Install app dependencies
RUN yarn

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn build

# Run app
CMD [ "yarn", "start" ]

EXPOSE 3000




