import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly champUtilisateur: Locator;
  readonly champMotDePasse: Locator;
  readonly boutonConnexion: Locator;
  readonly lienInscription: Locator;
  readonly messageErreur: Locator;

  constructor(page: Page) {
    this.page = page;
    this.champUtilisateur = page.getByTestId("signin-username");
    this.champMotDePasse = page.getByTestId("signin-password");
    this.boutonConnexion = page.getByTestId("signin-submit");
    this.lienInscription = page.getByTestId("signup-link");
    // Pas de data-testid dédié côté app pour ce message : on encapsule quand
    // même le texte ici pour qu'aucune spec n'ait à connaître ce détail DOM.
    this.messageErreur = page.getByText(/incorrect/i);
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
