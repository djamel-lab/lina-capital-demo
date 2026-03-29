# Spécifications — Porte-monnaie investisseur (Wallet & Séquestre)

**Plateforme** : app.lina.capital — Lina Capital SAS (PSFP)
**Version** : 1.0 — Mars 2026
**Auteur** : Djamel Khamari (DG)
**Validation conformité** : Hadjer Bennat (RCCI)
**Référentiel** : Règlement (UE) 2020/1503 Art. 10, Directive DSP2, Code Monétaire et Financier

---

## Vue d'ensemble

Chaque investisseur disposant d'un compte actif (onboarding complété) se voit attribuer un porte-monnaie électronique hébergé chez le Prestataire de Services de Paiement (PSP). Ce wallet est le point de passage obligatoire de tout flux financier : l'investisseur crédite son wallet, souscrit depuis son wallet, et les fonds non investis peuvent être retirés vers son compte bancaire personnel.

**Principe clé** : Lina Capital ne touche jamais les fonds des investisseurs. Tous les flux transitent par le PSP (Mipise/Mangopay). Lina Capital est un intermédiaire informationnel, pas un dépositaire.

```
Compte bancaire investisseur
        ↕ Crédit (virement/CB) / Débit (retrait)
┌─────────────────────────────────────┐
│   WALLET INVESTISSEUR (chez PSP)    │
│   Solde disponible : XXX €          │
│   Solde séquestré  : XXX €          │
└─────────────────────────────────────┘
        ↕ Souscription / Rétractation
┌─────────────────────────────────────┐
│   COMPTE SÉQUESTRE PROJET           │
│   (1 par levée, chez PSP)           │
│   Déblocage au closing              │
└─────────────────────────────────────┘
        ↓ Closing réussi
     Compte du porteur de projet
```

---

## 1. Ouverture du wallet

### Déclencheur
Automatique à l'activation du compte investisseur (fin de l'étape 6 — Signature).

### Flux
1. Appel API PSP : création wallet nominatif rattaché à l'identité KYC validée
2. Le wallet est créé avec un solde de 0 €
3. Un IBAN virtuel permanent est attribué au wallet (pour les virements entrants)
4. L'investisseur reçoit un email de confirmation avec ses coordonnées wallet

### Données wallet

| Champ | Source | Description |
|---|---|---|
| wallet_id | PSP | Identifiant unique du wallet chez le PSP |
| iban_virtuel | PSP | IBAN permanent pour les virements entrants |
| bic | PSP | BIC associé |
| user_id | Lina | Rattachement au compte investisseur |
| profile_id | Lina | Rattachement au profil (PP ou PM) |
| status | PSP | Actif / Suspendu / Clôturé |
| created_at | Lina | Date de création |

### Règles de gestion
- Un wallet par profil investisseur (PP ou PM)
- Le wallet est cloisonné : un investisseur avec un profil PP et un profil PM a 2 wallets distincts
- Le wallet ne peut pas être créé si le KYC n'est pas validé
- Le wallet est suspendu automatiquement si le KYC expire

---

## 2. Crédit du wallet (Alimentation)

### 2.1. Par virement bancaire

**Flux :**
1. L'investisseur accède à la page "Mon wallet" → "Alimenter"
2. Affichage de l'IBAN virtuel permanent + BIC + référence de virement
3. Bouton "Télécharger mon RIB" (PDF généré)
4. L'investisseur effectue le virement depuis sa banque
5. Réception du virement par le PSP (délai : 1-3 jours ouvrés)
6. Crédit automatique du wallet
7. Notification email + mise à jour du solde en temps réel

**Écran "Alimenter par virement" :**

| Élément | Contenu |
|---|---|
| IBAN | FR76 XXXX XXXX XXXX XXXX XXXX XXX |
| BIC | XXXXXXXX |
| Bénéficiaire | Lina Capital — Compte ségrégué [NOM INVESTISSEUR] |
| Référence | LINA-[WALLET_ID] (obligatoire) |
| Bouton | "Télécharger mon RIB" (PDF) |
| Note | "Le virement est généralement crédité sous 1 à 3 jours ouvrés." |

### 2.2. Par carte bancaire (Visa / Mastercard)

**Flux :**
1. L'investisseur accède à "Alimenter" → "Par carte bancaire"
2. Saisie du montant souhaité
3. Redirection vers la page de paiement sécurisée du PSP (iframe ou redirect)
4. Authentification forte DSP2 (3D Secure)
5. Crédit immédiat du wallet après validation
6. Notification email + mise à jour du solde

**Écran "Alimenter par carte" :**

| Élément | Type | Validation |
|---|---|---|
| Montant | number | Min 10 €, max 50 000 € |
| Bouton | CTA | "Payer [MONTANT] € par carte" |
| Logos | Visa, Mastercard, 3D Secure | Affiché sous le bouton |
| Frais | Info | "Frais CB : X% — prélevés sur le montant" |

**Règles frais CB :**
- Les frais sont à la charge de l'investisseur OU absorbés par Lina Capital (décision en attente)
- Affichage obligatoire du montant des frais AVANT validation
- Pas de frais sur les virements bancaires

### Règles communes
- Montant minimum de crédit : **10 €**
- Montant maximum par opération CB : **50 000 €**
- Pas de plafond par virement (le PSP applique ses propres contrôles LCB-FT)
- Chaque crédit est loggé avec : montant, méthode, date, statut, ID transaction PSP
- En cas d'échec CB, l'investisseur est informé du motif (refus banque, 3DS échoué, etc.)

---

## 3. Solde et historique

### Écran "Mon wallet"

**Section solde :**
- **Solde disponible** : montant libre, peut être investi ou retiré
- **Solde séquestré** : montant engagé dans des souscriptions en cours (non disponible)
- **Solde total** : disponible + séquestré

**Section historique :**
Table triée par date décroissante.

| Colonne | Description |
|---|---|
| Date | Timestamp de l'opération |
| Type | Crédit virement / Crédit CB / Souscription / Rétractation / Retrait / Déblocage |
| Projet | Nom du projet (si applicable) |
| Montant | Positif (crédit) ou négatif (débit) |
| Solde après | Solde disponible après l'opération |
| Statut | Effectué / En attente / Annulé / Échoué |
| Référence | ID transaction PSP |

**Filtres :**
- Par type d'opération
- Par période (date début — date fin)
- Par profil (PP / PM si multi-profils)

### Règles de gestion
- L'historique est conservé pendant toute la durée de vie du compte + 10 ans après clôture
- L'historique est cloisonné par profil (PP et PM voient chacun leur propre historique)
- Export CSV disponible

---

## 4. Séquestre lors d'une souscription

### Flux de séquestre

```
1. Investisseur clique "Investir" sur un projet
2. Montant prélevé du SOLDE DISPONIBLE → transféré vers SOLDE SÉQUESTRÉ
3. Le montant est séquestré sur le compte séquestre projet (chez le PSP)
4. Début de la période de rétractation (4 jours pour non-avertis)
5a. Si rétractation → fonds retournent au SOLDE DISPONIBLE
5b. Si pas de rétractation → fonds restent séquestrés jusqu'au closing
6a. Si closing réussi → fonds transférés au porteur de projet
6b. Si levée échouée → fonds retournent au SOLDE DISPONIBLE
```

### Contrôles avant souscription
| Contrôle | Action si échoué |
|---|---|
| Solde disponible ≥ montant + frais | Message "Solde insuffisant — Alimentez votre wallet" |
| KYC valide | Redirection vers renouvellement KYC |
| Test d'adéquation valide | Redirection vers renouvellement test |
| FICI lue et acceptée | Blocage avec message |
| Alerte montant élevé (Art. 21.7) | Affichage modale consentement |

### Règles de gestion
- Le séquestre est immédiat et atomique (pas de double dépense possible)
- Pendant le séquestre, le montant est visible dans "Solde séquestré" avec mention du projet
- L'investisseur ne peut pas retirer des fonds séquestrés
- Le PSP gère le séquestre — Lina Capital envoie l'instruction mais ne détient pas les fonds

---

## 5. Retrait (Débit vers compte bancaire)

### Flux
1. L'investisseur accède à "Mon wallet" → "Retirer"
2. Saisie ou sélection du compte bancaire de destination
3. Saisie du montant (limité au solde disponible)
4. Confirmation (2FA ou mot de passe)
5. Instruction envoyée au PSP
6. Virement effectué sous 2-5 jours ouvrés
7. Notification email à l'exécution

### Écran "Retirer"

| Élément | Type | Validation |
|---|---|---|
| Compte de destination | select | Liste des RIB enregistrés |
| Nouveau RIB | formulaire | IBAN + BIC + Titulaire (vérification concordance identité) |
| Montant | number | Min 10 €, max solde disponible |
| Bouton | CTA | "Retirer [MONTANT] €" |
| Note | info | "Virement sous 2 à 5 jours ouvrés. 0 € de frais." |

### Règles de gestion
- Seul le solde disponible est retirable (pas le solde séquestré)
- Le RIB de destination doit être au nom de l'investisseur (vérification concordance PSP)
- L'investisseur peut enregistrer jusqu'à 3 RIB
- Montant minimum de retrait : **10 €**
- Pas de frais de retrait (décision à confirmer)
- Un retrait peut être annulé tant qu'il n'est pas exécuté par le PSP
- Délai de traitement cible : 2-5 jours ouvrés

---

## 6. Notifications email liées au wallet

| Déclencheur | Objet |
|---|---|
| Wallet créé | "Votre porte-monnaie est activé" |
| Crédit virement reçu | "Votre wallet a été crédité de [MONTANT] €" |
| Crédit CB effectué | "Paiement CB de [MONTANT] € confirmé" |
| Crédit CB échoué | "Échec du paiement par carte — Réessayez" |
| Souscription — séquestre | "Souscription [PROJET] — [MONTANT] € séquestrés" |
| Rétractation — déblocage | "Rétractation confirmée — [MONTANT] € recrédités" |
| Retrait initié | "Retrait de [MONTANT] € en cours de traitement" |
| Retrait exécuté | "Retrait de [MONTANT] € effectué vers votre compte" |
| Closing réussi | "Levée [PROJET] réussie — Vos fonds ont été transférés" |
| Levée échouée | "Levée [PROJET] non atteinte — Vos fonds sont recrédités" |
| Wallet suspendu (KYC expiré) | "Action requise — Renouvelez votre KYC pour débloquer votre wallet" |

---

## 7. Sécurité

- Toutes les opérations wallet passent par l'API PSP en HTTPS (TLS 1.3)
- Chaque opération sensible (retrait, ajout RIB) nécessite une confirmation 2FA ou mot de passe
- Rate limiting sur les opérations : max 10 crédits CB/jour, max 5 retraits/jour
- Logs d'audit immuables pour chaque opération (timestamp, IP, user-agent, montant, résultat)
- Le PSP effectue ses propres contrôles LCB-FT sur les flux (détection de transactions suspectes)
- En cas de suspicion, le PSP peut bloquer une opération — Lina Capital est notifié et la RCCI est alertée

---

## 8. Points de décision ouverts

| # | Sujet | Options | Décideur | Statut |
|---|---|---|---|---|
| 1 | Frais CB à la charge de qui | Investisseur / Lina Capital / Partagé | Djamel + Adrien | ⏳ |
| 2 | Frais de retrait | 0 € / 1 € fixe / % | Djamel + Adrien | ⏳ |
| 3 | Plafond CB par opération | 10 000 € / 50 000 € | Djamel + PSP | ⏳ |
| 4 | Nombre max de RIB enregistrés | 3 / 5 / illimité | Djamel | ⏳ |
| 5 | API PSP exacte (Mipise wrapper ou Mangopay direct) | Mipise / Mangopay | Djamel + Lénore | ⏳ |

---

*Document de travail — À valider par Hadjer Bennat (RCCI) et Adrien Pannetier avant Phase 2*