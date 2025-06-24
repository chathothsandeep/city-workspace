# Stage 1: Build
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* package-lock.json* ./
RUN npm install --legacy-peer-deps && npm audit fix --force || true

# Copy all files
COPY . .

# Build the Angular app
RUN npx nx build dashboard --configuration=production

# Stage 2: Run with Nginx
FROM nginx:alpine

# Copy nginx config
COPY apps/dashboard/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder
COPY --from=builder /app/dist/apps/dashboard /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]