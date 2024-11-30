# Guidely

Ce projet est réalisé dans le cadre de la startup qui se déroule tout au long de l'année.

Guidely est une Progressive web app (PWA) dédiée à la création et au partage de guides de voyage.
Elle permet aux voyageurs de créer des guides de voyage grâce à leurs expériences et de les partager avec la communauté.
Les utilisateurs peuvent également consulter les guides de voyage créés par d'autres utilisateurs et les enregistrer pour les consulter.

## Fonctionnalités actuelles

### Accès sans compte

- Consultation de la page d'accueil avec des guides recommandés

- visualisation des détails d'un guide

### Accès avec compte

- Création d'un guide

- Accès à toutes les fonctionnalités de l'application

## Technologies utilisées

- Backend : Nest.js

- TypeORM : ORM pour mapper les tables aux classes de modèles

- Base de données : PostgreSQL

- Docker pour la configuration de la bdd

- Clouadinary utilisé comme cloud pour stocker les images des utilisateurs


## Configuration des variables d'environnement

Le projet utilise un fichier `.env` pour stocker les variables d'environnement.
Un fichier .env.example est fourni comme modèle.

Créer un fichier `.env` à la racine du projet et copier le contenu du fichier `.env.example` dans le fichier `.env`.

## Installation

```bash
# Cloner le projet
git clone https://github.com/jadegurnaud/startup-api.git

# Accéder au dossier
cd startup-api

# Installer les dépendances
npm install

# Configuration de la bdd
# Assurez-vous d'avoir Docker installé et en cours d'exécution sur votre machine
docker-compose up -d

# Exécuter le script de seeding pour pré-remplir la bdd
npm run seed

# Lancer l'application
npm run start
```