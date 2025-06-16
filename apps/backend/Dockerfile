# Stage 1: Build
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* package-lock.json* ./
RUN npm install --legacy-peer-deps && npm audit fix --force || true

# Copy all files
COPY . .

# Build the backend
RUN npx nx build backend

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

# Update Alpine packages to reduce vulnerabilities
RUN apk update && apk upgrade

# Copy built files from builder
COPY --from=builder /app/dist/apps/backend ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/package.json .

# Expose port (adjust as needed)
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]