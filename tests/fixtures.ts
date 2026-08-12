import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

type CompteDeTest = { utilisateur: string; motDePasse: string };

type Fixtures = {
  compte: CompteDeTest;
  dashboardPage: DashboardPage;
};

// Fixture partagée : login réel + attente du dashboard. Les fixtures Playwright
// sont paresseuses, donc les tests qui ne consomment pas `dashboardPage`
// (ex : tests de login eux-mêmes) ne déclenchent aucune connexion superflue.
export const test = base.extend<Fixtures>({
  compte: [{ utilisateur: "johndoe", motDePasse: "s3cret" }, { option: true }],

  dashboardPage: async ({ page, compte }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.visiter();
    await loginPage.seConnecter(compte.utilisateur, compte.motDePasse);
    await loginPage.attendreDashboard();
    await use(new DashboardPage(page));
  },
});

export { expect };
