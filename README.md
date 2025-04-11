# TP-DockerCompose-MiniPlateforme

Structure du projet pour la mini plateforme utilisant Docker Compose.

## Instructions pour récupérer et lancer le projet

### Option 1 : Utiliser les images pré-construites (rapide)

1. Cloner ce dépôt ou télécharger les fichiers suivants :
   - `docker-compose.yml`
   - `.env`
   - Le dossier `db/docker-entrypoint-initdb.d` avec le script `init.sql`

2. Lancer l'ensemble des services avec la commande :
   ```bash
   docker-compose up -d
   ```

3. Accéder à l'application :
   - Frontend : http://localhost:8080
   - API Backend : http://localhost:3000/api/items

### Option 2 : Développement local (avec modification et build des images)

1. Cloner le dépôt complet :
   ```bash
   git clone <URL_DU_REPO>
   cd tp-group-docker-compose
   ```

2. Lancer en mode développement :
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
   ```

3. Les modifications du code source dans `frontend/` et `backend/` seront automatiquement prises en compte grâce aux volumes configurés.

## Images Docker

Ce projet utilise les images suivantes disponibles sur Docker Hub :
- [excalibur404/tp-docker-compose-backend](https://hub.docker.com/r/excalibur404/tp-docker-compose-backend)
- [excalibur404/tp-docker-compose-frontend](https://hub.docker.com/r/excalibur404/tp-docker-compose-frontend)

## Structure du projet

- `frontend/` : Application React
- `backend/` : API REST Node.js/Express
- `db/` : Scripts d'initialisation PostgreSQL
- `docker-compose.yml` : Configuration principale des services
- `docker-compose.override.yml` : Configuration spécifique pour le développement

## Répartition des tâches via Trello

Le board "TP Docker Compose – Mini Plateforme Multi-Services" est organisé comme suit :

### Backlog / Idées
- Lister toutes les idées, améliorations et points à discuter en réunion d’organisation.

### À Faire
- **Backend – Création du Dockerfile et API REST**  
  Responsable : Développeur Backend (Dev 1)  
  Checklist :  
  - Créer le Dockerfile (vérifier la bonne version de Node.js)  
  - Implémenter GET /api/items et POST /api/items  
  - Communiquer avec Dev 3 pour la configuration des variables.

- **Frontend – Dockerfile et Application React**  
  Responsable : Développeur Frontend (Dev 2)  
  Checklist :  
  - Créer le Dockerfile pour le frontend  
  - Développer l’affichage de la liste et le formulaire d’ajout  
  - Coordonner l’API endpoint avec Dev 1 et le mapping des ports avec Dev 3.

- **DB & Orchestration – Docker Compose & Configuration**  
  Responsable : Intégrateur (Dev 3)  
  Checklist :  
  - Choisir et configurer la base de données (PostgreSQL ou MongoDB)  
  - Configurer les volumes nommés et le réseau Docker  
  - Rédiger le docker-compose.yml et configurer le fichier .env  
  - Coordination avec Dev 1 et Dev 2 pour les ports et l’URL d’API.

- **Documentation & Docker Hub**  
  Responsable : Dev 4  
  Checklist :  
  - Rédiger un README détaillé (explications des services, liens Docker Hub, commandes d’exécution)  
  - Répondre aux questions de réflexion  
  - Publier les images sur Docker Hub avec les tags appropriés.

### En Cours
- Déplacer ici les cartes dont l'exécution est active avec des mises à jour régulières dans les commentaires pour faciliter la communication.

### En Revue / Tests
- Regrouper les tâches terminées et en attente de validation par l’équipe, incluant des tests des routes API et de l’intégration globale via Docker Compose.

### Terminé
- Déplacer les cartes validées et finalisées après la phase de revue.

## Réponses aux questions de réflexion

1. La différence entre build: et image: est que build: construit une image à partir d’un Dockerfile tandis que image: utilise une image pré-construite.  
2. L’intérêt d’utiliser un fichier .env dans un projet Docker est de centraliser et de faciliter la gestion des variables d’environnement.  
3. Les volumes Docker permettent de conserver les données entre les redémarrages et mises à jour en assurant leur persistance en dehors des conteneurs.  
4. Pour ajouter un quatrième service comme un reverse proxy NGINX, il suffit de le déclarer comme un service distinct dans docker-compose.yml connecté au même réseau interne pour gérer la répartition du trafic.
