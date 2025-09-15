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
