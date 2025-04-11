FROM node:14-slim
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./
# Installer les dépendances
RUN npm install

# Installer nodemon globalement (pour le mode dev)
RUN npm install -g nodemon

# Copier le reste de l'application
COPY . .

# Défaut : lancer en production (node index.js)
CMD ["node", "index.js"]
