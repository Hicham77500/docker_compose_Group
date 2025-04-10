# TP-DockerCompose-MiniPlateforme
Structure du projet pour la mini plateforme utilisant Docker Compose.


## Instructions pour récupérer et lancer le projet

- Cloner le repository sur votre machine.
- Vérifier que Docker et Docker Compose sont installés.
- Lancer l'ensemble des services avec la commande :  
  `docker-compose up`

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
