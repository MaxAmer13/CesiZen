<<<<<<< Updated upstream
# Utilise une image Node.js officielle légère (alpine)
FROM node:18-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers de l'application
COPY . .

# Expose le port 3000 (celui utilisé par Express)
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "app.js"]
=======
# ---- Build Angular ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# base href variable:
ARG BASE_HREF=/
# build prod
RUN npm run build -- --configuration=production --base-href "${BASE_HREF}"

# ---- Runtime Nginx ----
FROM nginx:1.27-alpine
# Nginx conf pour SPA (retourne index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ATTENTION: adapter le chemin si Angular sort dans dist/<nom-projet>
# Exemple commun: dist/CesiZen/browser (Angular v17+ standalone builder)
# ou dist/CesiZen (Angular <17)
# Essaie d'abord le chemin v17+, sinon dé-commente l'autre
COPY --from=build /app/dist/CesiZen/browser /usr/share/nginx/html
# COPY --from=build /app/dist/CesiZen /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
>>>>>>> Stashed changes
