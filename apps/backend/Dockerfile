# ---------- Builder Stage ----------
FROM node:20-bullseye AS builder

WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

WORKDIR /app/apps/backend

RUN npx prisma-multischema

# Generate Prisma Client
RUN npx prisma generate

# Build the NestJS backend
RUN npx nx build backend

# ---------- Runner Stage ----------
FROM node:20-bullseye AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy dependencies and built app from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy Prisma client generated files
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy app build and config files
COPY --from=builder /app/dist/apps/backend ./dist
COPY --from=builder /app/apps/backend/.env ./
COPY --from=builder /app/apps/backend/prisma ./prisma
COPY --from=builder /app/apps/backend/entrypoint.sh ./entrypoint.sh

RUN chmod +x entrypoint.sh

EXPOSE 8000
CMD ["./entrypoint.sh"]
