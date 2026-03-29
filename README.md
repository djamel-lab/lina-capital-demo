# Lina Capital — Démo Interactive

Démo app.lina.capital pour présentation actionnaires.
Plateforme PSFP crowdfunding equity conforme Shariah.

## Stack

Vue 3 + Pinia + Vue Router + Tailwind CSS 4 + Vite

## Écrans

- **Login** — connexion + Google/Apple + 2FA
- **Onboarding** — 6 étapes (Compte, Profil, KYC, Test adéquation, Catégorie, Signature)
- **Dashboard** — KPIs + répartition sectorielle + stats plateforme
- **Projets** — 4 levées (MedCare AI, GreenFarm Bio, LearnUp, HalalBox)
- **Fiche entreprise** — scoring, risques, fonds, équipe, documents + panel investir
- **Portefeuille** — participations avec PRU, performance, actions
- **Carnet d'ordres** — achat/vente + historique
- **Documents** — coffre-fort numérique

## Conformité AMF intégrée

- Pop-up risques première visite (Art. 19/23)
- FICI téléchargeable (Art. 23)
- Délai réflexion 4 jours (Art. 22)
- Alerte montant élevé (Art. 21.7)
- Simulation de perte 10% patrimoine (Art. 21.6)
- Test d'adéquation interactif (Art. 21)
- Pages réglementaires (mentions, réclamations, conflits, sélection)
- Taux de défaut affiché (Art. 20)

## Dev local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
# Génère dist/index.html (single file, ~213 Ko)
```

## Déploiement GitHub Pages

Créer `.github/workflows/deploy.yml` :

```yaml
name: Build and Deploy
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

Puis dans Settings > Pages > Source : **GitHub Actions**.

## Structure

```
src/
├── components/
│   ├── ui/          (8 composants réutilisables)
│   ├── layout/      (Sidebar, Header, Footer, NavTabs)
│   ├── invest/      (InvestPanel, HighAmountModal)
│   └── regulatory/  (RiskPopup, RegulatoryModal)
├── composables/     (useInvestCalc)
├── constants/       (projects, portfolio, orders, documents)
├── stores/          (auth, onboarding, invest)
├── views/
│   ├── LoginView, TwoFAView
│   ├── onboarding/  (6 étapes)
│   └── app/         (7 vues)
└── router/
```