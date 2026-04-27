// src/middlewares/errorHandler.js
// ⭐ O middleware que impressiona o júri
// Em vez de o servidor "quebrar" com um erro 500 genérico,
// retornamos sempre um JSON estruturado e legível

import { ZodError } from 'zod';

// Middleware de erreurs global (4 paramètres = convention Express)
export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path} →`, err.message);

  // Cas 1 : Erreur de validation Zod (données invalides du client)
  if (err instanceof ZodError) {
    const erreurs = err.errors.map((e) => ({
      champ: e.path.join('.'),
      message: e.message,
    }));

    return res.status(400).json({
      statut: 'erreur',
      type: 'VALIDATION_ERROR',
      message: 'Les données envoyées sont invalides',
      erreurs,
    });
  }

  // Cas 2 : Erreurs métier (404, 409, etc.) définies dans les controllers
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      statut: 'erreur',
      type: err.statusCode === 404 ? 'NOT_FOUND' : 'BUSINESS_ERROR',
      message: err.message,
    });
  }

  // Cas 3 : Erreur serveur inattendue (ne pas exposer les détails en prod)
  res.status(500).json({
    statut: 'erreur',
    type: 'SERVER_ERROR',
    message:
      process.env.NODE_ENV === 'production'
        ? 'Une erreur interne est survenue'
        : err.message,
  });
};

// Middleware 404 — route non trouvée
export const notFound = (req, res) => {
  res.status(404).json({
    statut: 'erreur',
    type: 'ROUTE_NOT_FOUND',
    message: `Route ${req.method} ${req.path} introuvable`,
  });
};