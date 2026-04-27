import { Router } from 'express';
import {
  creerIntervention,
  listerInterventions,
  obtenirIntervention,
  mettreAJourStatut,
  supprimerIntervention,
  modifierIntervention,
} from '../controllers/intervention.controller.js';
 
const router = Router();
 
// CRUD complet des interventions
router.post('/', creerIntervention);                        // Créer
router.get('/', listerInterventions);                       // Lister (avec filtres)
router.get('/:id', obtenirIntervention);
router.put('/:id', modifierIntervention);                       // Détail
router.patch('/:id/status', mettreAJourStatut);             // Modifier statut
router.delete('/:id', supprimerIntervention);               // Supprimer
 
export default router;