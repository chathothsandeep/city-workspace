# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps && npm audit fix --force || true

COPY . .

RUN npx nx build dashboard --configuration=production

# Stage 2: Serve with NGINX
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

COPY apps/dashboard/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/apps/dashboard/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]