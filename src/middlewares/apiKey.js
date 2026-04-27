// src/middlewares/apiKey.js
export const verificarApiKey = (req, res, next) => {
  const key = req.headers['x-api-key'];

  if (!key || key !== process.env.API_KEY) {
    return res.status(401).json({
      statut: 'erreur',
      type: 'UNAUTHORIZED',
      message: 'Clé API manquante ou invalide',
    });
  }

  next();
};