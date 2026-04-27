// src/models/intervention.model.js
import mongoose from 'mongoose';
import { z } from 'zod';

// Schéma Mongoose — structure des données dans MongoDB
const interventionSchema = new mongoose.Schema(
  {
    technicien: {
      type: String,
      required: [true, 'Le technicien est requis'],
      minlength: 2,
    },
    client: {
      type: String,
      required: [true, 'Le client est requis'],
      minlength: 2,
    },
    typeIntervention: {
      type: String,
      enum: ['fibre_optique', 'electricite', 'hydraulique', 'climatisation'],
      required: true,
    },
    adresse: {
      type: String,
      required: [true, 'L\'adresse est requise'],
    },
    dateIntervention: {
      type: Date,
      required: true,
    },
    priorite: {
      type: String,
      enum: ['basse', 'normale', 'haute', 'urgente'],
      default: 'normale',
    },
    statut: {
      type: String,
      enum: ['en_attente', 'en_cours', 'termine', 'annule'],
      default: 'en_attente',
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, // ajoute createdAt et updatedAt automatiquement
  }
);

export const Intervention = mongoose.model('Intervention', interventionSchema);

// Schéma Zod — validation des données avant insertion
export const interventionValidation = z.object({
  technicien: z.string().min(2, 'Le nom du technicien est requis (min. 2 caractères)'),
  client: z.string().min(2, 'Le nom du client est requis'),
  typeIntervention: z.enum(
    ['fibre_optique', 'electricite', 'hydraulique', 'climatisation'],
    { message: "Type d'intervention invalide" }
  ),
  adresse: z.string().min(5, "L'adresse est requise"),
  dateIntervention: z.string().datetime({ message: 'Format de date invalide (ISO 8601 requis)' }),
  priorite: z.enum(['basse', 'normale', 'haute', 'urgente']).default('normale'),
  notes: z.string().optional(),
});

export const statusValidation = z.object({
  statut: z.enum(['en_attente', 'en_cours', 'termine', 'annule'], {
    message: 'Statut invalide',
  }),
});