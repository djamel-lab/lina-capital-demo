<script setup>
import BaseModal from '../ui/BaseModal.vue'

defineProps({ type: String })
defineEmits(['close'])

const CONTENT = {
  mentions: {
    title: 'Mentions légales',
    sections: [
      { subtitle: null, text: '<strong>Lina Capital SAS</strong> — SAS au capital de XXX €<br>Siège : [Adresse], Paris<br>RCS Paris : [N°] — LEI : [N°]<br>Email : contact@lina.capital' },
      { subtitle: 'Statut réglementaire', text: 'Prestataire de Services de Financement Participatif (PSFP) — agrément AMF en cours. Registre ESMA.' },
      { subtitle: 'RCCI', text: 'Hadjer Bennat — rcci@lina.capital' },
      { subtitle: 'Plan de continuité (PCA)', text: 'En cas de cessation, un prestataire tiers assurera le suivi des investissements en cours (gestion extinctive).' },
      { subtitle: 'Auto-investissement', text: "Conformément à l'Art. 8, Lina Capital, ses dirigeants et actionnaires >20% ne soumettent pas de projets. Tout investissement se fait aux mêmes conditions et est divulgué." },
    ],
  },
  reclamation: {
    title: 'Réclamations',
    sections: [
      { subtitle: null, text: 'Traitement gratuit, conforme au RD 2022/2117.' },
      { subtitle: 'Contact', text: 'Email : reclamation@lina.capital<br>Courrier : Lina Capital — Service Réclamations — [Adresse]' },
      { subtitle: 'Délais', text: '<strong>Accusé :</strong> 10 jours ouvrables<br><strong>Réponse :</strong> 2 mois max' },
      { subtitle: 'Médiation', text: 'Médiateur AMF : mediateur-amf.org' },
    ],
  },
  conflits: {
    title: "Conflits d'intérêts",
    sections: [
      { subtitle: null, text: 'Art. 8, RD 2022/2111. Mesures de prévention, identification et gestion.' },
      { subtitle: null, text: 'Lina Capital ne soumet pas de projets. Investissements des dirigeants/actionnaires >20% divulgués. Sélection sur critères objectifs et auditables.' },
    ],
  },
  selection: {
    title: 'Politique de sélection (Due Diligence)',
    sections: [
      { subtitle: null, text: 'Art. 5. Vérification casier judiciaire, exclusion juridictions non coopératives, analyse financière, conformité Shariah.' },
      { subtitle: null, text: 'Notation sur 5 axes : solidité financière, marché, équipe, fonds, conformité.' },
    ],
  },
}
</script>

<template>
  <BaseModal @close="$emit('close')">
    <template v-if="CONTENT[type]">
      <h2 class="text-xl font-bold text-heading mb-5">{{ CONTENT[type].title }}</h2>
      <div v-for="(section, i) in CONTENT[type].sections" :key="i">
        <h3 v-if="section.subtitle" class="text-base font-bold text-primary mt-5 mb-2.5">{{ section.subtitle }}</h3>
        <p class="text-sm text-secondary leading-relaxed mb-3" v-html="section.text" />
      </div>
    </template>
  </BaseModal>
</template>