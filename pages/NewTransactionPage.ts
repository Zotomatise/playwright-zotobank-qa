import { Page, Locator } from "@playwright/test";

export class NewTransactionPage {
  readonly page: Page;
  readonly champMontant: Locator;
  readonly champDescription: Locator;
  readonly boutonEnvoyer: Locator;
  readonly modaleConfirmation: Locator;
  readonly montantConfirmation: Locator;
  readonly destinataireConfirmation: Locator;
  readonly boutonConfirmer: Locator;
  readonly boutonAnnulerConfirmation: Locator;
  readonly messageErreur: Locator;
  readonly listeUtilisateurs: Locator;

  constructor(page: Page) {
    this.page = page;
    this.champMontant = page.getByTestId("new-transaction-amount");
    this.champDescription = page.getByTestId("new-transaction-description");
    this.boutonEnvoyer = page.getByTestId("new-transaction-submit");
    this.modaleConfirmation = page.getByTestId("new-transaction-confirm-modal");
    this.montantConfirmation = page.getByTestId("confirm-amount");
    this.destinataireConfirmation = page.getByTestId("confirm-receiver");
    this.boutonConfirmer = page.getByTestId("new-transaction-confirm-submit");
    this.boutonAnnulerConfirmation = page.getByTestId("new-transaction-confirm-cancel");
    this.messageErreur = page.getByTestId("new-transaction-error");
    this.listeUtilisateurs = page.getByTestId("new-transaction-user-list");
  }

  async visiterEnvoi() {
    await this.page.goto("/transactions/new?type=payment");
  }

  destinataire(idUtilisateur: string): Locator {
    return this.page.getByTestId(`new-transaction-user-item-${idUtilisateur}`);
  }

  async choisirDestinataire(idUtilisateur: string) {
    await this.destinataire(idUtilisateur).click();
  }

  async remplirEtEnvoyer(montant: string, description = "") {
    if (description) {
      await this.champDescription.fill(description);
    }
    await this.champMontant.fill(montant);
    await this.boutonEnvoyer.click();
  }
}
