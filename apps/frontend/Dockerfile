# Stage 1: Build
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* package-lock.json* ./
RUN npm install --legacy-peer-deps && npm audit fix --force || true

# Copy all files
COPY . .

# Build the Next.js app
RUN npx nx build frontend

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose port (adjust as needed)
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]