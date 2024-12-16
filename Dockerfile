# Utiliser une image Node.js légère comme base
FROM node:18-alpine as build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration des dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application pour la production
RUN npm run build

# Deuxième étape - Servir l'application avec Nginx
FROM nginx:alpine

# Copier la configuration Nginx personnalisée si nécessaire
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
