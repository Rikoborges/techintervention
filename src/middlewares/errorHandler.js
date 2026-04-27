import { ZodError } from 'zod';

export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path} →`, err.message);

  // Erreur de validation Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      statut: 'erreur',
      type: 'VALIDATION_ERROR',
      message: 'Les données envoyées sont invalides',
      erreurs: err.issues.map((e) => ({
        champ: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  // Erreurs métier (404, 409, etc.)
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      statut: 'erreur',
      type: err.statusCode === 404 ? 'NOT_FOUND' : 'BUSINESS_ERROR',
      message: err.message,
    });
  }

  // Erreur serveur inattendue
  res.status(500).json({
    statut: 'erreur',
    type: 'SERVER_ERROR',
    message:
      process.env.NODE_ENV === 'production'
        ? 'Une erreur interne est survenue'
        : err.message,
  });
};

export const notFound = (req, res) => {
  res.status(404).json({
    statut: 'erreur',
    type: 'ROUTE_NOT_FOUND',
    message: `Route ${req.method} ${req.path} introuvable`,
  });
};