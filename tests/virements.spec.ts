import { test, expect } from "./fixtures";
import { NewTransactionPage } from "../pages/NewTransactionPage";

// Ces tests couvrent le formulaire de virement sans jamais confirmer un envoi
// d'argent valide, pour rester non destructifs sur les comptes de démo partagés.
test.describe("Virements", () => {
  let newTransactionPage: NewTransactionPage;

  test.beforeEach(async ({ page, dashboardPage }) => {
    newTransactionPage = new NewTransactionPage(page);
    await newTransactionPage.visiterEnvoi();
  });

  test("n'affiche pas l'utilisateur connecté dans la liste des destinataires", async () => {
    await expect(newTransactionPage.listeUtilisateurs).toBeVisible();
    await expect(newTransactionPage.destinataire("u-001")).toHaveCount(0);
  });

  test("refuse un montant à zéro avec un message d'erreur explicite", async () => {
    await newTransactionPage.choisirDestinataire("u-002");
    await newTransactionPage.remplirEtEnvoyer("0");
    await expect(newTransactionPage.modaleConfirmation).toBeVisible();

    await newTransactionPage.boutonConfirmer.click();
    await expect(newTransactionPage.messageErreur).toBeVisible();
    await expect(newTransactionPage.messageErreur).toContainText(/positif/i);
  });

  test("affiche la bonne modale de confirmation puis permet d'annuler sans envoyer", async () => {
    await newTransactionPage.choisirDestinataire("u-002");
    await newTransactionPage.remplirEtEnvoyer("5", "Test portfolio QA (annulé)");

    await expect(newTransactionPage.modaleConfirmation).toBeVisible();
    await expect(newTransactionPage.montantConfirmation).toContainText("5");
    await expect(newTransactionPage.destinataireConfirmation).toContainText("Jane Smith");

    await newTransactionPage.boutonAnnulerConfirmation.click();
    await expect(newTransactionPage.modaleConfirmation).toBeHidden();
  });
});
