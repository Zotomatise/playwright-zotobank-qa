# Playwright · ZotoBank QA

Suite de tests Playwright (UI + API) sur [ZotoBank](https://zotobank.zotomatise.com), une application bancaire de démonstration (Next.js + JWT) déployée en production et dédiée à la pratique de l'automatisation de test.

![CI](https://github.com/Zotomatise/playwright-zotobank-qa/actions/workflows/ci.yml/badge.svg)

## Stack

- [Playwright](https://playwright.dev/) + TypeScript
- Test runner natif Playwright (`@playwright/test`)
- Page Object Model
- Tests API purs via `APIRequestContext` (sans navigateur)
- GitHub Actions (CI sur chaque push/PR, rapport HTML archivé)

## Structure

```
tests/
├── auth.spec.ts           # Connexion, déconnexion, identifiants invalides
├── dashboard.spec.ts      # Éléments clés du tableau de bord
├── virements.spec.ts      # Formulaire de virement, validations, confirmation
└── api/
    └── transactions.spec.ts  # Tests API purs (auth, pagination, filtres, contrat de réponse)
pages/                      # Page Object Model (LoginPage, DashboardPage, NewTransactionPage)
```

## Lancer les tests

```bash
npm install
npx playwright install --with-deps chromium
npm test              # headless, contre https://zotobank.zotomatise.com
npm run test:ui        # mode interactif Playwright UI
npm run report         # ouvre le dernier rapport HTML
```

## Ce que ce repo démontre

- **Page Object Model** en TypeScript, typé avec `Locator`/`Page`.
- **Sélecteurs stables** via `getByTestId`, jamais de sélecteurs CSS fragiles.
- **Double compétence UI + API** : les mêmes règles métier (authentification, montant invalide) sont vérifiées côté interface et côté API.
- **Tests non destructifs** : aucun scénario ne confirme un virement réel sur les comptes de démo partagés — la modale de confirmation est vérifiée puis annulée. Les cas négatifs (montant à zéro, mauvais mot de passe) sont sans risque par nature.
- **Exécution séquentielle maîtrisée** (`workers: 1`) pour éviter les effets de bord entre tests sur des comptes de test partagés.
- **CI/CD** : suite complète (UI + API) exécutée automatiquement sur GitHub Actions, rapport HTML archivé en artefact.

## Comptes de test utilisés

Comptes de démonstration publics (voir la page [/guide](https://zotobank.zotomatise.com/guide) de l'application), mot de passe commun `s3cret` : `johndoe`, `janesmith`, entre autres.

---

Application testée développée par [Zotomatise](https://zotomatise.com), formation en automatisation de test logiciel.
