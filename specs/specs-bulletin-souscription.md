# Spécifications — Bulletin de souscription & Signature électronique

**Plateforme** : app.lina.capital — Lina Capital SAS (PSFP)
**Version** : 1.0 — Mars 2026
**Auteur** : Djamel Khamari (DG)
**Validation conformité** : Hadjer Bennat (RCCI)
**Référentiel** : Règlement (UE) 2020/1503 Art. 10, 22, 23 ; eIDAS ; Code de commerce Art. L225-138

---

## Vue d'ensemble

Chaque souscription equity génère automatiquement un bulletin de souscription personnalisé. Ce document contractuel est signé électroniquement par l'investisseur avant que les fonds soient séquestrés. Le bulletin signé est archivé et accessible en permanence depuis l'espace investisseur.

```
Investisseur clique "Investir"
    ↓
Vérifications (solde, KYC, test, FICI, Art. 21.7)
    ↓
Génération automatique du bulletin de souscription (PDF)
    ↓
Prévisualisation du bulletin (lecture obligatoire)
    ↓
Signature électronique (Xodo Sign — 2FA SMS)
    ↓
Séquestre des fonds (wallet → compte séquestre projet)
    ↓
Email de confirmation + bulletin signé en PJ
    ↓
Période de rétractation (4 jours — non-avertis)
```

---

## 1. Génération du bulletin de souscription

### Déclencheur
L'investisseur a passé toutes les vérifications pré-souscription et confirme son intention d'investir.

### Contenu du bulletin

Le bulletin est un document PDF généré dynamiquement à partir d'un template et des données de la souscription.

**Section 1 — Identité du souscripteur**

| Champ | Source | Exemple |
|---|---|---|
| Nom complet | Profil investisseur | Lea Dupont |
| Date de naissance | Profil investisseur | 15/03/1988 |
| Adresse | Profil investisseur | 24 rue de la Paix, 75002 Paris |
| Email | Compte | lea.dupont@email.com |
| Catégorie | Test d'adéquation | Investisseur non averti |
| Profil | Type compte | Personne physique |
| *Pour PM* : Dénomination, SIREN, représentant | Profil PM | — |

**Section 2 — Caractéristiques de l'émission**

| Champ | Source | Exemple |
|---|---|---|
| Nom de l'émetteur | Fiche projet | MedCare AI SAS |
| SIREN émetteur | Fiche projet | 123 456 789 |
| Nature des titres | Fiche projet | Actions ordinaires |
| Prix unitaire | Fiche projet | 12,50 € |
| Valeur nominale | Fiche projet | 1,00 € |
| Nombre total de titres offerts | Fiche projet | 48 000 |
| Objectif de levée | Fiche projet | 600 000 € |
| Seuil minimum de collecte | Fiche projet | 300 000 € (50%) |
| Date d'ouverture | Fiche projet | 01/03/2026 |
| Date de clôture prévue | Fiche projet | 30/06/2026 |

**Section 3 — Souscription**

| Champ | Source | Exemple |
|---|---|---|
| Nombre de titres souscrits | Calcul | 40 |
| Prix unitaire | Fiche projet | 12,50 € |
| Montant brut | Calcul | 500,00 € |
| Frais de souscription (X%) | Config plateforme | 10,00 € (2%) |
| Montant total | Calcul | 510,00 € |
| Moyen de paiement | Wallet | Porte-monnaie Lina Capital |

**Section 4 — Avertissements réglementaires (texte fixe)**

> **Risques :** L'investissement dans des titres de capital de sociétés non cotées comporte un risque de perte totale ou partielle du capital investi. Les titres ne sont pas liquides et ne peuvent généralement pas être revendus facilement. Les performances passées ne préjugent pas des performances futures. Aucun rendement n'est garanti.
>
> **Fonds de garantie :** Cet investissement n'est couvert par aucun fonds de garantie des dépôts (Directive 2014/49/UE) ni système d'indemnisation des investisseurs (Directive 97/9/CE).
>
> **FICI :** Le souscripteur déclare avoir pris connaissance de la Fiche d'Information Clé sur l'Investissement (KIIS) relative à cette offre, conformément à l'article 23 du Règlement (UE) 2020/1503.
>
> **Délai de rétractation :** Conformément à l'article 22 du Règlement (UE) 2020/1503, le souscripteur non averti dispose d'un délai de rétractation de 4 jours calendaires à compter de la signature du bulletin, sans avoir à justifier sa décision. En cas de rétractation, les fonds séquestrés sont intégralement restitués.

**Section 5 — Attestations (cases pré-cochées dans le formulaire, rappelées dans le PDF)**

- ☑ J'ai lu et accepté la FICI de ce projet
- ☑ Je reconnais le risque de perte totale du capital
- ☑ Je confirme que mon test d'adéquation est à jour
- ☑ [Si Art. 21.7] Je confirme que ce montant significatif est compatible avec ma situation financière

**Section 6 — Signatures**

| Champ | Contenu |
|---|---|
| Signature investisseur | Signature électronique (Xodo Sign) |
| Date de signature | Horodatage automatique |
| Référence bulletin | LINA-BSC-[ANNÉE]-[NUMÉRO_SÉQUENTIEL] |
| Hash du document | SHA-256 du PDF avant signature |

### Template et génération

- Le template est un fichier HTML/CSS converti en PDF (via WeasyPrint ou équivalent)
- Les variables dynamiques sont injectées côté serveur (Flask)
- Le PDF est généré, hashé, puis envoyé à Xodo Sign pour signature
- Versioning du template : chaque modification du template incrémente un numéro de version (BSC-TPL-v1.0, v1.1, etc.)
- Le numéro de version du template est mentionné dans le bulletin

---

## 2. Signature électronique

### Prestataire
**Xodo Sign** (ex-eversign) — signature électronique avancée conforme eIDAS.

### Flux de signature

```
1. PDF du bulletin généré côté serveur
2. Upload du PDF vers Xodo Sign via API
3. Création d'une demande de signature (signataire = investisseur)
4. L'investisseur est redirigé vers Xodo Sign (iframe ou redirect)
5. Authentification du signataire :
   a. Email (lien unique envoyé)
   b. Code SMS (2FA) sur le numéro vérifié du profil
6. L'investisseur lit le document (scroll tracking)
7. L'investisseur signe (signature manuscrite dessinée ou tapée)
8. Xodo Sign scelle le document (horodatage + certificat)
9. Callback webhook vers Lina Capital : "document signé"
10. Le PDF signé est stocké et le séquestre est déclenché
```

### Niveaux de signature

| Contexte | Niveau eIDAS | Justification |
|---|---|---|
| Bulletin de souscription | Avancée (AES) | Identification du signataire + intégrité du document |
| CGU / Attestation risques (onboarding) | Simple (SES) | Consentement, pas d'engagement financier direct |

> **Point de décision** : Le niveau exact (simple vs avancée vs qualifiée) est à valider par Hadjer.

### Authentification du signataire
- **Email** : lien unique avec token, validité 30 minutes
- **SMS** : code 6 chiffres envoyé au numéro vérifié lors du KYC, validité 5 minutes
- Les deux facteurs sont requis pour le bulletin de souscription (signature avancée)

### Gestion des erreurs

| Situation | Action |
|---|---|
| Investisseur ne signe pas dans les 24h | Relance email automatique |
| Investisseur ne signe pas dans les 72h | Annulation de la souscription, notification |
| Échec SMS (numéro invalide) | Proposition de renvoyer ou de contacter le support |
| Xodo Sign indisponible | Message d'erreur + retry automatique dans 5 min |

---

## 3. Post-signature

### Immédiatement après signature
1. Le bulletin signé (PDF scellé) est stocké :
   - Dans l'espace documents de l'investisseur (coffre-fort numérique)
   - Dans l'espace admin du projet (côté Lina Capital)
   - Chez Xodo Sign (archivage tiers)
2. Les fonds sont séquestrés (appel API PSP)
3. Email de confirmation envoyé à l'investisseur avec :
   - Bulletin signé en pièce jointe
   - Rappel du délai de rétractation (4 jours)
   - Lien vers l'espace investisseur

### Période de rétractation (Art. 22)

| Catégorie investisseur | Délai | Rétractation possible |
|---|---|---|
| Non averti | 4 jours calendaires | Oui — bouton "Se rétracter" dans l'espace investisseur |
| Averti | 0 jour | Non — engagement immédiat |

**Flux de rétractation :**
1. L'investisseur clique "Se rétracter" dans sa souscription en cours
2. Confirmation (modale) : "Confirmez-vous la rétractation de votre souscription ?"
3. Si confirmé :
   - Statut souscription → "Rétractée"
   - Fonds séquestrés → retour au solde disponible du wallet
   - Bulletin de souscription → annoté "RÉTRACTÉE" (mention en filigrane)
   - Email de confirmation de rétractation
4. La rétractation est irrévocable

**Calcul du délai :**
- J0 = date de signature du bulletin
- Fin du délai = J0 + 4 jours calendaires, à 23h59 (heure de Paris)
- Exemple : signature le 15/03 à 14h → rétractation possible jusqu'au 19/03 à 23h59

---

## 4. Archivage

| Document | Durée de conservation | Lieu |
|---|---|---|
| Bulletin signé (PDF scellé) | 10 ans après clôture du compte | Scaleway S3 (chiffré AES-256) + Xodo Sign |
| Preuve de signature (certificat) | 10 ans | Xodo Sign |
| Log de signature (IP, timestamp, user-agent) | 10 ans | Base de données Lina Capital |
| Template du bulletin (version) | Indéfini | Repo GitHub |

### Accès investisseur
- Le bulletin signé est téléchargeable en permanence depuis l'espace "Mes documents"
- Le certificat de signature est accessible via un lien vers Xodo Sign

---

## 5. Modèle de données

### Table `subscriptions`

| Champ | Type | Description |
|---|---|---|
| id | UUID | Identifiant unique |
| user_id | FK → users | Investisseur |
| profile_id | FK → profiles | Profil PP ou PM |
| project_id | FK → projects | Projet souscrit |
| amount | DECIMAL(10,2) | Montant brut |
| shares | INT | Nombre de titres |
| price_per_share | DECIMAL(10,2) | Prix unitaire |
| fees | DECIMAL(10,2) | Frais |
| total | DECIMAL(10,2) | Montant total (brut + frais) |
| bulletin_ref | VARCHAR | LINA-BSC-2026-0001 |
| bulletin_pdf_url | VARCHAR | URL S3 du PDF signé |
| bulletin_hash | VARCHAR | SHA-256 du PDF |
| bulletin_template_version | VARCHAR | BSC-TPL-v1.0 |
| xodo_document_id | VARCHAR | ID du document chez Xodo Sign |
| signature_date | DATETIME | Date/heure de signature |
| retraction_deadline | DATETIME | Fin du délai de rétractation |
| status | ENUM | draft / pending_signature / signed / retracted / sequestered / completed / failed |
| created_at | DATETIME | Création |
| updated_at | DATETIME | Dernière modification |

### Statuts du cycle de vie

```
draft → pending_signature → signed → sequestered → completed
                                   → retracted
                                                  → failed (levée échouée)
```

---

## 6. Notifications email

| Déclencheur | Objet |
|---|---|
| Bulletin généré, en attente de signature | "Signez votre bulletin de souscription — [PROJET]" |
| Relance signature (J+1) | "Rappel — Votre bulletin attend votre signature" |
| Annulation (pas signé dans 72h) | "Souscription annulée — Bulletin non signé" |
| Signature effectuée | "Souscription confirmée — [PROJET] — [MONTANT] €" (PJ: bulletin signé) |
| Rétractation effectuée | "Rétractation confirmée — [MONTANT] € recrédités" |
| Closing réussi | "Félicitations — Vous êtes actionnaire de [PROJET]" |
| Levée échouée | "Levée [PROJET] non atteinte — Remboursement en cours" |

---

## 7. Points de décision ouverts

| # | Sujet | Options | Décideur | Statut |
|---|---|---|---|---|
| 1 | Niveau de signature eIDAS | Simple / Avancée / Qualifiée | Hadjer | ⏳ |
| 2 | 2FA signature : SMS seul ou SMS + Email | SMS seul / SMS + Email | Hadjer + Djamel | ⏳ |
| 3 | Iframe Xodo Sign ou redirect | Iframe / Redirect | Lénore | ⏳ |
| 4 | Template bulletin : HTML→PDF ou Word→PDF | WeasyPrint / python-docx | Lénore | ⏳ |
| 5 | Montant minimum de souscription | 100 € / 50 € / projet par projet | Adrien | ⏳ |
| 6 | Seuil minimum de collecte (closing) | 50% / 75% / projet par projet | Adrien | ⏳ |

---

*Document de travail — À valider par Hadjer Bennat (RCCI) et Adrien Pannetier avant Phase 2*