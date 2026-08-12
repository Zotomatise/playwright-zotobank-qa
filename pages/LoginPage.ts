import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly champUtilisateur: Locator;
  readonly champMotDePasse: Locator;
  readonly boutonConnexion: Locator;

  constructor(page: Page) {
    this.page = page;
    this.champUtilisateur = page.getByTestId("signin-username");
    this.champMotDePasse = page.getByTestId("signin-password");
    this.boutonConnexion = page.getByTestId("signin-submit");
  }

  async visiter() {
    await this.page.goto("/login");
  }

  async seConnecter(utilisateur: string, motDePasse: string) {
    await this.champUtilisateur.fill(utilisateur);
    await this.champMotDePasse.fill(motDePasse);
    await this.boutonConnexion.click();
  }

  async attendreDashboard() {
    await expect(this.page).toHaveURL(/\/dashboard/);
  }
}
