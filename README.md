# 🔧 InterventionConnect API

API RESTful de gestion des interventions techniques pour les secteurs fibre optique, électricité, hydraulique et climatisation.

Projet réalisé dans le cadre du titre professionnel **Développeur Web et Mobile (RNCP37674)**.

---

## 📋 Présentation

**InterventionConnect** est une API de gestion d'ordres de service pour techniciens de terrain.  
Elle permet de créer, consulter, modifier et supprimer des interventions techniques, avec validation des données, gestion des erreurs et persistance en base de données.

---

## 🛠️ Stack technique

| Technologie | Rôle |
|---|---|
| **Node.js** | Environnement d'exécution |
| **Express** | Framework HTTP |
| **MongoDB Atlas** | Base de données cloud |
| **Mongoose** | ODM — modélisation des données |
| **Zod** | Validation de schéma |
| **Helmet** | Sécurité des headers HTTP |
| **dotenv** | Variables d'environnement |
| **Vitest** | Tests unitaires |
| **HTML/CSS/JS** | Frontend statique intégré |

---

## 📁 Architecture du projet

```
TechIntervention/
├── public/
│   └── index.html              # Frontend — formulaire + liste
├── src/
│   ├── config/
│   │   └── db.js               # Connexion MongoDB
│   ├── controllers/
│   │   └── intervention.controller.js   # Logique métier
│   ├── middlewares/
│   │   └── errorHandler.js     # Gestion centralisée des erreurs
│   ├── models/
│   │   └── intervention.model.js        # Schéma Mongoose + validation Zod
│   ├── routes/
│   │   └── intervention.routes.js       # Définition des endpoints
│   └── app.js                  # Point d'entrée
├── tests/
│   └── intervention.test.js    # Tests unitaires Vitest
├── .env.example                # Modèle de variables d'environnement
├── .gitignore
├── package.json
└── tests.http                  # Tests manuels REST Client
```

> **Architecture MVC** — chaque fichier a une responsabilité unique (Separation of Concerns).

---

## 🚀 Installation

### Prérequis
- Node.js v18 ou supérieur
- Compte MongoDB Atlas (gratuit)

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/Rikoborges/techintervention.git
cd techintervention

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Remplir MONGO_URI dans le fichier .env

# 4. Démarrer en développement
npm run dev
```

Le serveur démarre sur `http://localhost:3000`.

---

## ⚙️ Variables d'environnement

Créer un fichier `.env` à la racine (ne jamais committer ce fichier) :

```
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb+srv://<utilisateur>:<mot_de_passe>@<cluster>.mongodb.net/<base>?retryWrites=true&w=majority
```

---

## 📡 Endpoints

### Base URL : `http://localhost:3000/api`

| Méthode | Route | Description | Code succès |
|---|---|---|---|
| `GET` | `/interventions` | Lister toutes les interventions | 200 |
| `GET` | `/interventions/:id` | Détail d'une intervention | 200 |
| `POST` | `/interventions` | Créer une intervention | 201 |
| `PUT` | `/interventions/:id` | Modifier une intervention complète | 200 |
| `PATCH` | `/interventions/:id/status` | Mettre à jour le statut | 200 |
| `DELETE` | `/interventions/:id` | Supprimer une intervention | 204 |

### Filtres disponibles (GET /interventions)

```
GET /api/interventions?statut=en_attente
GET /api/interventions?type=fibre_optique
GET /api/interventions?priorite=urgente
GET /api/interventions?statut=en_cours&type=electricite
```

---

## 📦 Modèle de données

```json
{
  "technicien": "Jean Dupont",
  "client": "Résidence Les Pins",
  "typeIntervention": "fibre_optique",
  "adresse": "12 rue de la Paix, 75001 Paris",
  "dateIntervention": "2025-09-15T09:00:00.000Z",
  "priorite": "haute",
  "notes": "Accès par le gardien, code 1234"
}
```

### Valeurs acceptées

**typeIntervention** : `fibre_optique` · `electricite` · `hydraulique` · `climatisation`

**priorite** : `basse` · `normale` · `haute` · `urgente`

**statut** : `en_attente` · `en_cours` · `termine` · `annule`

---

## 🔒 Logique métier

- Uma intervenção **annulée** não pode mais ser modificada → `409 Conflict`
- Uma intervenção **en cours** não pode ser suprimida → `409 Conflict`
- Todos os dados são validados pelo **Zod** antes da inserção → `400 Bad Request`
- Os erros retornam sempre um **JSON estruturado**, nunca um crash do servidor

---

## 🧪 Tests

### Tests unitaires (Vitest)

```bash
npm test
```

```
✓ tests/intervention.test.js (5 tests)
  ✓ accepte une intervention valide
  ✓ rejette un technicien avec moins de 2 caractères
  ✓ rejette un type intervention invalide
  ✓ accepte un statut valide
  ✓ rejette un statut invalide
```

### Tests manuels (REST Client — VSCode)

Installer l'extension **REST Client** de Huachao Mao, puis ouvrir `tests.http` et cliquer sur **Send Request**.

---

## 🔐 Sécurité

- Variables sensibles dans `.env` — jamais dans le code source
- `.env` listé dans `.gitignore` — ne jamais committer
- **Helmet** protège les headers HTTP (XSS, clickjacking, etc.)
- **Zod** valide et sanitize toutes les entrées avant traitement
- Messages d'erreur génériques en production (détails cachés)

---

## 🖥️ Frontend

Un frontend statique est intégré et servi par l'API sur `http://localhost:3000`.

Fonctionnalités :
- Formulaire de création d'intervention
- Liste des interventions avec filtres par statut et type
- Badges colorés par priorité et statut
- Actualisation en temps réel

---

## 👨‍💻 Auteur

**Ricardo Duarte Borges** — Riko Dev Studio  
[rikodevstudio.com](https://rikodevstudio.com) · [rikodevstudio@gmail.com](mailto:rikodevstudio@gmail.com)

Titre professionnel Développeur Web et Mobile — RNCP37674  
AFEC Valence · 2025–2026
