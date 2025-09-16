# Stage 1 — Build Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration=production

# Stage 2 — Serve with Nginx
FROM nginx:1.27-alpine
COPY --from=build /app/dist/* /usr/share/nginx/html/
# sécurité: pas de listing, cache basique
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK CMD wget -qO- http://localhost/ || exit 1
