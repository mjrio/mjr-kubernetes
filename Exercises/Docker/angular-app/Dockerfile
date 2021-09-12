# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets
# Name the node stage "builder"
FROM node:16.8.0-alpine3.13 AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
RUN npm i && npm run build

# nginx state for serving content
FROM nginx:1.20.1-alpine

# Upate the default nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# From environment variable
ARG dotnetApiUrl="http://localhost:5000/api"
ENV DOTNET_API_URL=${dotnetApiUrl}
# Copy static assets from builder stage
COPY --from=builder /app/dist/angular-app .
# Containers run nginx with global directives and daemon off
EXPOSE 80
# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
