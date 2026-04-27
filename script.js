 
    const API = 'http://localhost:3000/api/interventions';

    async function creerIntervention() {
      const msg = document.getElementById('msg');
      const body = {
        technicien: document.getElementById('technicien').value,
        client: document.getElementById('client').value,
        typeIntervention: document.getElementById('typeIntervention').value,
        priorite: document.getElementById('priorite').value,
        adresse: document.getElementById('adresse').value,
        dateIntervention: new Date(document.getElementById('dateIntervention').value).toISOString(),
        notes: document.getElementById('notes').value,
      };

      try {
        const res = await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();

        if (res.ok) {
          msg.className = 'msg success';
          msg.textContent = '✅ Intervention créée avec succès!';
          chargerInterventions();
        } else {
          msg.className = 'msg error';
          msg.textContent = '❌ ' + (data.erreurs?.[0]?.message || data.message);
        }
      } catch (err) {
        msg.className = 'msg error';
        msg.textContent = '❌ Erreur de connexion à l\'API';
      }
    }

    async function chargerInterventions() {
      const res = await fetch(API);
      const data = await res.json();
      const liste = document.getElementById('liste');

      liste.innerHTML = data.data.map(i => `
        <tr>
          <td>${i.technicien}</td>
          <td>${i.client}</td>
          <td>${i.typeIntervention.replace('_', ' ')}</td>
          <td>${i.priorite}</td>
          <td><span class="badge ${i.statut}">${i.statut.replace('_', ' ')}</span></td>
        </tr>
      `).join('');
    }

    // Charge la liste au démarrage
    chargerInterventions();
