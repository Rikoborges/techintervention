// src/controllers/intervention.controller.js
import { Intervention, interventionValidation, statusValidation } from '../models/intervention.model.js';

// POST /api/interventions — Créer une intervention
export const creerIntervention = async (req, res, next) => {
  try {
    const donneesValidees = interventionValidation.parse(req.body);
    const intervention = await Intervention.create(donneesValidees);
    res.status(201).json({
      message: 'Intervention créée avec succès',
      data: intervention,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/interventions — Lister avec filtres
export const listerInterventions = async (req, res, next) => {
  try {
    const { statut, type, priorite } = req.query;
    const filtre = {};
    if (statut) filtre.statut = statut;
    if (type) filtre.typeIntervention = type;
    if (priorite) filtre.priorite = priorite;
    const interventions = await Intervention.find(filtre).sort({ createdAt: -1 });
    res.status(200).json({
      total: interventions.length,
      filtres: { statut, type, priorite },
      data: interventions,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/interventions/:id — Détail
export const obtenirIntervention = async (req, res, next) => {
  try {
    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      const err = new Error('Intervention introuvable');
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ data: intervention });
  } catch (err) {
    next(err);
  }
};

// PUT /api/interventions/:id — Modifier une intervention complète
export const modifierIntervention = async (req, res, next) => {
  try {
    const donneesValidees = interventionValidation.parse(req.body);
    const intervention = await Intervention.findByIdAndUpdate(
      req.params.id,
      donneesValidees,
      { new: true, runValidators: true }
    );
    if (!intervention) {
      const err = new Error('Intervention introuvable');
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({
      message: 'Intervention modifiée avec succès',
      data: intervention,
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/interventions/:id/status — Mettre à jour le statut
export const mettreAJourStatut = async (req, res, next) => {
  try {
    const { statut } = statusValidation.parse(req.body);
    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      const err = new Error('Intervention introuvable');
      err.statusCode = 404;
      return next(err);
    }
    if (intervention.statut === 'annule') {
      const err = new Error("Impossible de modifier une intervention annulée");
      err.statusCode = 409;
      return next(err);
    }
    intervention.statut = statut;
    await intervention.save();
    res.status(200).json({
      message: 'Statut mis à jour avec succès',
      data: intervention,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/interventions/:id — Supprimer
export const supprimerIntervention = async (req, res, next) => {
  try {
    const intervention = await Intervention.findById(req.params.id);
    if (!intervention) {
      const err = new Error('Intervention introuvable');
      err.statusCode = 404;
      return next(err);
    }
    if (intervention.statut === 'en_cours') {
      const err = new Error("Impossible de supprimer une intervention en cours");
      err.statusCode = 409;
      return next(err);
    }
    await intervention.deleteOne();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};