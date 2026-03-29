# Spécifications — Multi-profils PP/PM & Bénéficiaires effectifs

**Plateforme** : app.lina.capital — Lina Capital SAS (PSFP)
**Version** : 1.0 — Mars 2026
**Auteur** : Djamel Khamari (DG)
**Validation conformité** : Hadjer Bennat (RCCI)
**Référentiel** : Règlement (UE) 2020/1503 Art. 5, 21 ; 4e/5e Directives LCB-FT ; Code Monétaire et Financier Art. L561-2-2

---

## Vue d'ensemble

Un même utilisateur (personne physique) peut investir à titre personnel ET au nom d'une ou plusieurs personnes morales (holding, SCI, SARL, etc.). Chaque profil est autonome : KYC propre, wallet propre, test d'adéquation propre, portefeuille propre.

```
┌─────────────────────────────────────────────┐
│              COMPTE UTILISATEUR             │
│          lea.dupont@email.com               │
│          (authentification unique)          │
├─────────────┬───────────────────────────────┤
│  Profil PP  │  Profil PM 1    Profil PM 2  │
│  Lea Dupont │  SCI Jade       Holding LD    │
│             │                               │
│  KYC PP     │  KYC PM 1       KYC PM 2     │
│  Wallet PP  │  Wallet PM 1    Wallet PM 2  │
│  Test PP    │  Test PM 1      Test PM 2    │
│  Ptf PP     │  Ptf PM 1       Ptf PM 2    │
└─────────────┴───────────────────────────────┘
```

**Principe clé** : un seul login, plusieurs "casquettes". L'investisseur switche de profil via un sélecteur dans le header. Toutes les données (wallet, souscriptions, documents) sont cloisonnées par profil.

---

## 1. Architecture des profils

### Modèle de données

**Table `users` (compte)**

| Champ | Type | Description |
|---|---|---|
| id | UUID | Identifiant unique du compte |
| email | VARCHAR UNIQUE | Email de connexion |
| password_hash | VARCHAR | Mot de passe hashé (bcrypt) |
| phone | VARCHAR | Téléphone (2FA) |
| created_at | DATETIME | Date de création |
| status | ENUM | active / suspended / closed |

**Table `profiles` (profils investisseur)**

| Champ | Type | Description |
|---|---|---|
| id | UUID | Identifiant unique du profil |
| user_id | FK → users | Rattachement au compte |
| type | ENUM | PP / PM |
| label | VARCHAR | Nom affiché ("Lea Dupont" ou "SCI Jade") |
| is_default | BOOLEAN | Profil par défaut (le PP) |
| status | ENUM | draft / pending_kyc / active / suspended / closed |
| created_at | DATETIME | Création |

**Table `profiles_pp` (données PP)**

| Champ | Type | Description |
|---|---|---|
| profile_id | FK → profiles | 1:1 |
| civility | ENUM | M. / Mme |
| first_name | VARCHAR | Prénom |
| last_name | VARCHAR | Nom |
| birth_date | DATE | Date de naissance |
| nationality | VARCHAR | ISO 3166-1 |
| address | TEXT | Adresse postale |
| city | VARCHAR | Ville |
| postal_code | VARCHAR | Code postal |
| country | VARCHAR | Pays |
| tax_residence | VARCHAR | Pays de résidence fiscale |
| profession | VARCHAR | Situation professionnelle |
| sector | VARCHAR | Secteur d'activité |

**Table `profiles_pm` (données PM)**

| Champ | Type | Description |
|---|---|---|
| profile_id | FK → profiles | 1:1 |
| company_name | VARCHAR | Dénomination sociale |
| legal_form | ENUM | SAS / SARL / SA / SCI / EURL / Autre |
| siren | VARCHAR(9) | Numéro SIREN (vérifié Luhn) |
| siret | VARCHAR(14) | Numéro SIRET (optionnel) |
| rcs_city | VARCHAR | Ville RCS |
| address | TEXT | Adresse du siège social |
| city | VARCHAR | Ville |
| postal_code | VARCHAR | Code postal |
| country | VARCHAR | Pays |
| sector | VARCHAR | Secteur d'activité NAF |
| capital | DECIMAL | Capital social |
| representative_profile_id | FK → profiles_pp | Le représentant légal (= le PP du compte) |
| representative_role | ENUM | Gérant / Président / DG / Autre |
| incorporation_date | DATE | Date d'immatriculation |

### Règles de gestion
- Tout compte a obligatoirement 1 profil PP (créé à l'onboarding)
- L'utilisateur peut créer 0 à N profils PM
- Le profil PP est toujours le représentant légal des profils PM (simplification V1)
- Chaque profil a son propre statut KYC, wallet, test d'adéquation, portefeuille
- La suppression d'un profil PM est impossible tant qu'il a des souscriptions actives ou un solde wallet > 0

---

## 2. Parcours de création d'un profil PM

### Accès
Depuis l'espace investisseur → "Mes profils" → "Ajouter une personne morale"

### Étapes

```
Étape 1          Étape 2           Étape 3              Étape 4          Étape 5
Informations →   Documents    →    Bénéficiaires   →    Test         →   Activation
société          KYC PM            effectifs             d'adéquation     wallet PM
```

### Étape 1 — Informations société

| Champ | Type | Obligatoire | Validation |
|---|---|---|---|
| Dénomination sociale | text | Oui | Min 2 caractères |
| Forme juridique | select | Oui | SAS / SARL / SA / SCI / EURL / Autre |
| SIREN | text | Oui | 9 chiffres, contrôle Luhn, vérification API INSEE si dispo |
| SIRET | text | Non | 14 chiffres |
| Ville RCS | text | Oui | — |
| Adresse siège | text | Oui | — |
| Code postal + Ville + Pays | text/select | Oui | — |
| Secteur d'activité | select | Oui | Liste NAF |
| Capital social | number | Oui | — |
| Date d'immatriculation | date | Oui | — |
| Qualité du représentant | select | Oui | Gérant / Président / DG / Autre |

**Vérifications automatiques :**
- Le SIREN est vérifié (format + si API INSEE disponible, concordance dénomination/adresse)
- Pays du siège ≠ juridiction non coopérative (liste UE) → blocage si positif (Art. 5.2.b)

### Étape 2 — Documents KYC PM

| Document | Formats | Taille max | Obligatoire |
|---|---|---|---|
| Extrait Kbis ou équivalent (< 3 mois) | PDF | 10 Mo | Oui |
| Statuts à jour (signés, dernière version) | PDF | 10 Mo | Oui |
| Pièce d'identité du représentant légal | JPG, PNG, PDF | 10 Mo | Oui (réutilise le KYC PP si déjà validé) |
| Procès-verbal de nomination du représentant | PDF | 10 Mo | Si le représentant n'est pas dans les statuts |

**Règles :**
- Si le KYC PP du représentant est déjà validé, sa pièce d'identité est réutilisée automatiquement (pas de re-upload)
- Les documents sont envoyés au PSP pour vérification
- Mêmes statuts et délais que le KYC PP (cf. specs onboarding étape 3)

### Étape 3 — Bénéficiaires effectifs (voir section 3 ci-dessous)

### Étape 4 — Test d'adéquation PM
- Le test est identique au test PP (mêmes questions, mêmes règles)
- Mais il est passé "au nom de la PM" avec les données financières de la société
- La catégorisation (averti/non averti) est propre à la PM
- Validité : 2 ans

### Étape 5 — Activation
- Création du wallet PM chez le PSP
- Profil PM → statut "active"
- Email de confirmation

---

## 3. Bénéficiaires effectifs (BE)

### Obligation légale
Toute PM doit déclarer ses bénéficiaires effectifs : les personnes physiques qui détiennent, directement ou indirectement, plus de **25% du capital ou des droits de vote**, ou qui exercent un contrôle effectif sur la société.

### Écran "Bénéficiaires effectifs"

**Liste des BE déclarés** (table éditable) :

| Champ | Type | Obligatoire | Validation |
|---|---|---|---|
| Civilité | select | Oui | M. / Mme |
| Nom | text | Oui | Min 2 caractères |
| Prénom | text | Oui | Min 2 caractères |
| Date de naissance | date | Oui | ≥ 18 ans |
| Nationalité | select | Oui | ISO 3166-1 |
| Adresse | text | Oui | — |
| Type de contrôle | select | Oui | Capital / Droits de vote / Contrôle effectif / Autre |
| Pourcentage de détention | number | Oui | ≥ 25% |
| Pièce d'identité | upload | Oui | JPG, PNG, PDF — 10 Mo |

**Bouton "Ajouter un bénéficiaire"** — l'investisseur peut ajouter 1 à N bénéficiaires.

### Cas particuliers

| Situation | Règle |
|---|---|
| Le représentant légal est aussi BE | Pré-remplissage automatique depuis le profil PP, pièce d'identité réutilisée |
| Aucun BE > 25% | L'investisseur doit déclarer le(s) dirigeant(s) comme bénéficiaires effectifs |
| BE est une personne morale | Non accepté en V1 — uniquement des personnes physiques |
| Chaîne de détention indirecte | L'investisseur doit remonter jusqu'aux PP (déclaratif, vérifié manuellement par la RCCI) |

### Vérifications LCB-FT sur chaque BE

| Vérification | Source | Action |
|---|---|---|
| Filtrage PPE | Base de données PPE (via PSP ou Efficiale) | Alerte RCCI si positif |
| Filtrage sanctions | UE, ONU, OFAC, gel des avoirs | Blocage si positif, RCCI alertée |
| Concordance identité | Pièce d'identité vs. données saisies | Auto (MRZ) ou manuel |
| Juridiction non coopérative | Nationalité/résidence vs. liste UE | Blocage si positif |

### Document généré : Formulaire DBE-S1

> **Note** : Le formulaire DBE-S1 est le formulaire officiel de déclaration des bénéficiaires effectifs auprès du greffe. Lina Capital ne le soumet pas au greffe (c'est la responsabilité de la PM), mais peut le générer en pré-rempli pour faciliter la démarche.

- Bouton "Télécharger le formulaire DBE-S1 pré-rempli" (PDF)
- Contenu : données saisies par l'investisseur
- Le formulaire est informatif, pas contractuel

### Règles de gestion
- Au moins 1 bénéficiaire effectif doit être déclaré
- La somme des pourcentages n'a pas besoin de faire 100% (un BE peut détenir 30%, un autre 40%)
- Toute modification des BE déclenche une revue RCCI
- Les pièces d'identité des BE sont stockées chiffrées (AES-256)
- Mise à jour obligatoire si changement d'actionnariat (auto-déclaration annuelle)

---

## 4. Sélecteur de profil (UI)

### Emplacement
Dans le header de l'app, à côté du nom de l'utilisateur.

### Comportement
- Dropdown affichant tous les profils de l'utilisateur
- Profil actif = surligné
- Cliquer sur un profil switche tout le contexte (wallet, portefeuille, documents)
- Badge de statut à côté de chaque profil (✓ Actif, ⏳ En attente KYC, ❌ Suspendu)

### Exemple UI

```
┌──────────────────────────────────┐
│  Lea Dupont          ▾  [LD]    │
├──────────────────────────────────┤
│  ✓ Lea Dupont (Personnel)       │  ← profil PP
│  ✓ SCI Jade                     │  ← profil PM actif
│  ⏳ Holding LD (KYC en cours)    │  ← profil PM en attente
│  ─────────────────────────       │
│  + Ajouter une personne morale  │
└──────────────────────────────────┘
```

### Cloisonnement des données

Quand l'utilisateur switche de profil, **tout** change :
- Wallet affiché (solde, historique)
- Portefeuille (participations, dividendes)
- Documents (bulletins, contrats)
- Souscriptions en cours
- Test d'adéquation / catégorisation
- Carnet d'ordres

Le header affiche clairement quel profil est actif (nom + badge PP/PM).

---

## 5. Impacts sur les specs existantes

### Onboarding (specs-onboarding-investisseur.md)
- L'étape 2 (Profil) ne concerne que le profil PP
- Ajouter une note : "La création de profils PM est possible après activation du compte"
- L'étape 4 (Test) et 5 (Catégorisation) ne s'appliquent qu'au profil PP lors de l'onboarding

### Wallet (specs-wallet-investisseur.md)
- Un wallet par profil → remplacer "un wallet par utilisateur" par "un wallet par profil"
- L'historique des mouvements est cloisonné par profil
- Le RIB de destination pour les retraits PM doit être au nom de la PM

### Bulletin de souscription (specs-bulletin-souscription.md)
- La section "Identité du souscripteur" change selon PP ou PM
- Pour une PM : dénomination sociale, SIREN, représentant légal, qualité
- Le bulletin mentionne explicitement "agissant au nom et pour le compte de [PM]"

### Dashboard et portefeuille
- Le dashboard affiche les données du profil actif uniquement
- Ajouter un dashboard "vue consolidée" (optionnel V2) avec le total tous profils confondus

---

## 6. Notifications email spécifiques

| Déclencheur | Objet |
|---|---|
| Profil PM créé | "Profil [DÉNOMINATION] créé — Complétez le KYC" |
| KYC PM validé | "KYC [DÉNOMINATION] validé — Wallet activé" |
| KYC PM rejeté | "Documents [DÉNOMINATION] non conformes — Action requise" |
| BE ajouté/modifié | "Bénéficiaires effectifs mis à jour — [DÉNOMINATION]" |
| Alerte PPE sur un BE | [Email interne RCCI uniquement] "Alerte PPE — [NOM BE] — [DÉNOMINATION]" |
| Test PM complété | "Test d'adéquation [DÉNOMINATION] — Résultat" |
| Rappel annuel BE | "Mise à jour annuelle des bénéficiaires effectifs — [DÉNOMINATION]" |

---

## 7. Modèle de données complémentaire

### Table `beneficial_owners`

| Champ | Type | Description |
|---|---|---|
| id | UUID | Identifiant unique |
| profile_id | FK → profiles (PM) | Rattachement au profil PM |
| civility | ENUM | M. / Mme |
| first_name | VARCHAR | Prénom |
| last_name | VARCHAR | Nom |
| birth_date | DATE | Date de naissance |
| nationality | VARCHAR | ISO 3166-1 |
| address | TEXT | Adresse |
| control_type | ENUM | capital / voting_rights / effective_control / other |
| ownership_pct | DECIMAL(5,2) | Pourcentage de détention |
| id_document_url | VARCHAR | URL S3 de la pièce d'identité (chiffré) |
| pep_status | ENUM | clean / flagged / pending_review |
| sanctions_status | ENUM | clean / flagged / blocked |
| verified_at | DATETIME | Date de dernière vérification |
| created_at | DATETIME | Création |
| updated_at | DATETIME | Dernière modification |

---

## 8. Points de décision ouverts

| # | Sujet | Options | Décideur | Statut |
|---|---|---|---|---|
| 1 | Nombre max de profils PM par compte | 3 / 5 / illimité | Djamel | ⏳ |
| 2 | Le représentant légal est-il forcément le titulaire du compte ? | Oui (V1) / Non (V2 avec mandat) | Hadjer | ⏳ |
| 3 | Vérification SIREN par API INSEE | Oui / Non (déclaratif) | Lénore | ⏳ |
| 4 | Dashboard consolidé multi-profils | V1 / V2 | Djamel | ⏳ |
| 5 | Chaînes de détention indirectes | Déclaratif seul / Organigramme requis | Hadjer | ⏳ |
| 6 | Formulaire DBE-S1 pré-rempli | Oui / Non (pas notre responsabilité) | Hadjer + Adrien | ⏳ |

---

*Document de travail — À valider par Hadjer Bennat (RCCI) et Adrien Pannetier avant Phase 2*