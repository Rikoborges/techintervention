import { describe, it, expect } from 'vitest';

// Test unitaire — validation du schéma Zod
import { interventionValidation, statusValidation } from '../src/models/intervention.model.js';

describe('Validation du schéma Intervention', () => {

  it('✅ accepte une intervention valide', () => {
    const result = interventionValidation.safeParse({
      technicien: 'Jean Dupont',
      client: 'Résidence Les Pins',
      typeIntervention: 'fibre_optique',
      adresse: '12 rue de la Paix, 75001 Paris',
      dateIntervention: '2025-09-15T09:00:00.000Z',
      priorite: 'haute',
    });
    expect(result.success).toBe(true);
  });

  it('❌ rejette un technicien avec moins de 2 caractères', () => {
    const result = interventionValidation.safeParse({
      technicien: 'A',
      client: 'Client Test',
      typeIntervention: 'electricite',
      adresse: '5 rue Test',
      dateIntervention: '2025-09-15T09:00:00.000Z',
    });
    expect(result.success).toBe(false);
  });

  it('❌ rejette un type intervention invalide', () => {
    const result = interventionValidation.safeParse({
      technicien: 'Jean Dupont',
      client: 'Client Test',
      typeIntervention: 'invalide',
      adresse: '5 rue Test',
      dateIntervention: '2025-09-15T09:00:00.000Z',
    });
    expect(result.success).toBe(false);
  });

  it('✅ accepte un statut valide', () => {
    const result = statusValidation.safeParse({ statut: 'en_cours' });
    expect(result.success).toBe(true);
  });

  it('❌ rejette un statut invalide', () => {
    const result = statusValidation.safeParse({ statut: 'inconnu' });
    expect(result.success).toBe(false);
  });

});