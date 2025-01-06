# Utiliser l'image officielle Node.js comme base
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Compiler le code TypeScript en JavaScript
RUN npm run build

# Exposer le port sur lequel l'application va écouter
EXPOSE 3000

# Définir une variable d'environnement NODE_ENV (la valeur sera définie au moment du build)
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Démarrer l'application en mode production
CMD ["npm", "run", "start:prod"]