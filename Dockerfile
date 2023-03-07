#FROM node:14-alpine AS development
#ENV NODE_ENV development
# Add a work directory
#WORKDIR /app
# Cache and Install dependencies
#COPY package.json .
#COPY yarn.lock .
#RUN yarn install
# Copy app files
#COPY . .
# Expose port
#EXPOSE 3000
# Start the app
#CMD [ "yarn", "start" ]
#FROM node:14-alpine AS builder
FROM ubuntu:20.04 AS builder
#FROM debian AS builder
ENV NODE_ENV production
# Add a work directory
WORKDIR /app
#WORKDIR /usr/share/nginx/html
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN apt-get update
RUN apt-get -y install curl
RUN apt-get -y install gnupg
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get -y install yarn
RUN yarn --version
RUN node --version
RUN yarn cache clean -f
RUN yarn global add n
RUN n stable
RUN node --version
RUN yarn install --production
# Copy app files
COPY . .
# Build the app
RUN yarn build

# Bundle static assets with nginx
#FROM nginx:1.21.0-alpine as production
FROM nginx as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf .
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]

