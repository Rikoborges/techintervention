# 🔧 InterventionConnect API

> API RESTful de gestion des interventions techniques pour les secteurs fibre optique, électricité, hydraulique et climatisation.

**Projet réalisé dans le cadre du titre professionnel Développeur Web et Mobile (RNCP37674) — AFEC Valence 2025–2026.**

🌐 **Application en ligne :** [https://techintervention.onrender.com](https://techintervention.onrender.com)  
📁 **Code source :** [github.com/Rikoborges/techintervention](https://github.com/Rikoborges/techintervention)

---

## 📋 Contexte du projet

**InterventionConnect** simule un outil de gestion d'ordres de service utilisé par des entreprises de maintenance technique en France (fibre optique, électricité, hydraulique, climatisation).

L'application permet à un gestionnaire de :
- Créer et consulter des ordres de service
- Suivre l'avancement des interventions par statut
- Filtrer les interventions par type ou priorité
- Protéger l'accès aux données via une clé API

---

## 🛠️ Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| **Node.js** | v24 | Environnement d'exécution |
| **Express** | v5 | Framework HTTP |
| **MongoDB Atlas** | Cloud | Base de données |
| **Mongoose** | v8 | ODM — modélisation des données |
| **Zod** | v4 | Validation et sanitisation des entrées |
| **Helmet** | v8 | Sécurisation des headers HTTP |
| **dotenv** | v17 | Gestion des variables d'environnement |
| **Vitest** | v4 | Tests unitaires |
| **nodemon** | v3 | Rechargement automatique en développement |
| **HTML/CSS/JS** | — | Frontend statique intégré |

---

## 📁 Architecture du projet

```
TechIntervention/
│
├── public/
│   └── index.html                    # Interface utilisateur (formulaire + tableau)
│
├── src/
│   ├── config/
│   │   └── db.js                     # Connexion à MongoDB Atlas
│   │
│   ├── controllers/
│   │   └── intervention.controller.js # Logique métier (CRUD complet)
│   │
│   ├── middlewares/
│   │   ├── apiKey.js                  # Protection par clé API
│   │   └── errorHandler.js            # Gestion centralisée des erreurs
│   │
│   ├── models/
│   │   └── intervention.model.js      # Schéma Mongoose + validation Zod
│   │
│   ├── routes/
│   │   └── intervention.routes.js     # Définition des endpoints REST
│   │
│   └── app.js                         # Point d'entrée — configuration Express
│
├── tests/
│   └── intervention.test.js           # Tests unitaires Vitest (5 tests)
│
├── .env.example                       # Modèle de configuration
├── .gitignore                         # Exclusion de .env et node_modules
├── package.json
└── tests.http                         # Tests manuels REST Client (VSCode)
```

> **Principe appliqué : Séparation des responsabilités (SoC)**
> Chaque fichier a une seule responsabilité. Les routes ne contiennent pas de logique, les controllers ne contiennent pas de validation, les modèles ne contiennent pas de logique métier.

---

## 🚀 Installation locale

### Prérequis
- Node.js v18 ou supérieur
- Compte MongoDB Atlas (gratuit sur [cloud.mongodb.com](https://cloud.mongodb.com))

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/Rikoborges/techintervention.git
cd techintervention

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env et renseigner MONGO_URI et API_KEY

# 4. Démarrer en développement
npm run dev
```

Le serveur démarre sur `http://localhost:3000`.

---

## ⚙️ Variables d'environnement

Créer un fichier `.env` à la racine du projet.  
⚠️ Ce fichier ne doit **jamais** être commité — il est listé dans `.gitignore`.

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb+srv://<utilisateur>:<mot_de_passe>@<cluster>.mongodb.net/<base>?retryWrites=true&w=majority
API_KEY=votre_cle_secrete
```

---

## 📡 Endpoints de l'API

### URL de base : `https://techintervention.onrender.com/api`

| Méthode | Endpoint | Description | Code succès |
|---|---|---|---|
| `GET` | `/interventions` | Lister toutes les interventions | `200` |
| `GET` | `/interventions/:id` | Détail d'une intervention | `200` |
| `POST` | `/interventions` | Créer une intervention | `201` |
| `PUT` | `/interventions/:id` | Modifier une intervention complète | `200` |
| `PATCH` | `/interventions/:id/status` | Mettre à jour le statut uniquement | `200` |
| `DELETE` | `/interventions/:id` | Supprimer une intervention | `204` |

### Authentification

Toutes les routes nécessitent un header `x-api-key` :

```http
x-api-key: votre_cle_secrete
```

Sans ce header, l'API retourne `401 Unauthorized`.

### Filtres disponibles (GET /interventions)

```
GET /api/interventions?statut=en_attente
GET /api/interventions?type=fibre_optique
GET /api/interventions?priorite=urgente
GET /api/interventions?statut=en_cours&type=electricite
```

---

## 📦 Modèle de données

### Corps de requête (POST / PUT)

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

| Champ | Valeurs possibles |
|---|---|
| `typeIntervention` | `fibre_optique` · `electricite` · `hydraulique` · `climatisation` |
| `priorite` | `basse` · `normale` · `haute` · `urgente` |
| `statut` | `en_attente` · `en_cours` · `termine` · `annule` |

### Réponse type

```json
{
  "message": "Intervention créée avec succès",
  "data": {
    "_id": "69ef353f9325c1ea879b0478",
    "technicien": "Jean Dupont",
    "client": "Résidence Les Pins",
    "typeIntervention": "fibre_optique",
    "adresse": "12 rue de la Paix, 75001 Paris",
    "dateIntervention": "2025-09-15T09:00:00.000Z",
    "priorite": "haute",
    "statut": "en_attente",
    "notes": "Accès par le gardien",
    "createdAt": "2026-04-27T10:06:55.433Z",
    "updatedAt": "2026-04-27T10:06:55.433Z"
  }
}
```

---

## 🔒 Logique métier

| Règle | Code retourné |
|---|---|
| Données invalides (champ manquant, type incorrect) | `400 Bad Request` |
| Clé API manquante ou incorrecte | `401 Unauthorized` |
| Intervention introuvable | `404 Not Found` |
| Modifier une intervention **annulée** | `409 Conflict` |
| Supprimer une intervention **en cours** | `409 Conflict` |
| Erreur serveur inattendue | `500 Internal Server Error` |

### Format des erreurs

Toutes les erreurs retournent un JSON structuré — le serveur ne "crash" jamais :

```json
{
  "statut": "erreur",
  "type": "VALIDATION_ERROR",
  "message": "Les données envoyées sont invalides",
  "erreurs": [
    {
      "champ": "technicien",
      "message": "Le nom du technicien est requis (min. 2 caractères)"
    }
  ]
}
```

---

## 🧪 Tests

### Tests unitaires — Vitest

```bash
npm test
```

**Résultat attendu :**

```
✓ tests/intervention.test.js (5 tests) 12ms
  ✓ Validation du schéma Intervention (5)
    ✓ accepte une intervention valide
    ✓ rejette un technicien avec moins de 2 caractères
    ✓ rejette un type intervention invalide
    ✓ accepte un statut valide
    ✓ rejette un statut invalide

Test Files  1 passed (1)
Tests       5 passed (5)
```

### Tests manuels — REST Client (VSCode)

1. Installer l'extension **REST Client** (Huachao Mao)
2. Ouvrir le fichier `tests.http`
3. Cliquer sur **Send Request** au-dessus de chaque bloc

Le fichier couvre tous les cas : création valide, erreurs de validation, filtres, mise à jour de statut, suppression et routes inexistantes.

---

## 🔐 Sécurité

| Mesure | Implémentation |
|---|---|
| Variables sensibles hors du code | `dotenv` + `.gitignore` |
| Protection des headers HTTP | `Helmet` (XSS, clickjacking, MIME sniffing) |
| Authentification des requêtes | Middleware `x-api-key` |
| Validation des entrées | `Zod` — avant toute insertion en base |
| Messages d'erreur en production | Détails cachés, message générique retourné |

---

## 🖥️ Frontend

L'interface utilisateur est servie directement par l'API via `express.static('public')`.

**Fonctionnalités :**
- Formulaire de création d'intervention avec validation côté client
- Tableau des interventions avec filtres dynamiques (statut, type)
- Indicateurs statistiques (total, en attente, en cours, terminées)
- Badges colorés par priorité et statut
- Design responsive — mobile et desktop

---

## ☁️ Déploiement

| Service | Rôle |
|---|---|
| **Render.com** | Hébergement du serveur Node.js |
| **MongoDB Atlas** | Base de données cloud |
| **UptimeRobot** | Monitoring — maintien en activité (ping toutes les 14 min) |
| **GitHub** | Dépôt source — déploiement automatique sur push |

Le déploiement est automatique : chaque `git push origin main` déclenche un redéploiement sur Render.

---

## 👨‍💻 Auteur

**Ricardo Duarte Borges** — Riko Dev Studio  
[rikodevstudio.com](https://rikodevstudio.com) · [rikodevstudio@gmail.com](mailto:rikodevstudio@gmail.com)  
WhatsApp : +33 7 81 58 31 01

Titre professionnel **Développeur Web et Mobile — RNCP37674**  
AFEC Valence · 2025–2026
