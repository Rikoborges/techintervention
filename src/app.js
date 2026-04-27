// src/app.js — Point d'entrée de l'application
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import conectarDB from './config/db.js';
import interventionRoutes from './routes/Intervention.routes.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à la base de données
conectarDB();

// Middlewares globaux
app.use(express.static('public'));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json())



// Route de santé
app.get('/api', (req, res) => {
  res.json({
    api: 'InterventionConnect API',
    version: '1.0.0',
    statut: 'opérationnelle',
  });
});

// Routes métier
app.use('/api/interventions', interventionRoutes);

// Gestion des erreurs (toujours en dernier)
app.use(notFound);
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`   Environnement: ${process.env.NODE_ENV}`);
});