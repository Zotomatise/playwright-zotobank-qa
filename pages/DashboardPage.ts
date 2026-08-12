import { Page, Locator } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly carteSolde: Locator;
  readonly comptesBancaires: Locator;
  readonly transactionsRecentes: Locator;
  readonly boutonEnvoyer: Locator;
  readonly boutonDemander: Locator;
  readonly boutonDeconnexion: Locator;
  readonly nomUtilisateurTopbar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.carteSolde = page.getByTestId("dashboard-balance-card");
    this.comptesBancaires = page.getByTestId("dashboard-bank-accounts");
    this.transactionsRecentes = page.getByTestId("dashboard-recent-transactions");
    this.boutonEnvoyer = page.getByTestId("dashboard-send-money");
    this.boutonDemander = page.getByTestId("dashboard-request-money");
    this.boutonDeconnexion = page.getByTestId("nav-logout");
    this.nomUtilisateurTopbar = page.getByTestId("topbar-username");
  }

  async visiter() {
    await this.page.goto("/dashboard");
  }

  async seDeconnecter() {
    await this.boutonDeconnexion.click();
  }
}
