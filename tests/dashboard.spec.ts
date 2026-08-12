import { test, expect } from "./fixtures";
import { NewTransactionPage } from "../pages/NewTransactionPage";

test.describe("Dashboard", () => {
  test.use({ compte: { utilisateur: "janesmith", motDePasse: "s3cret" } });

  test("affiche la carte de solde", async ({ dashboardPage }) => {
    await expect(dashboardPage.carteSolde).toBeVisible();
  });

  test("affiche la liste des comptes bancaires", async ({ dashboardPage }) => {
    await expect(dashboardPage.comptesBancaires).toBeVisible();
  });

  test("affiche les transactions récentes", async ({ dashboardPage }) => {
    await expect(dashboardPage.transactionsRecentes).toBeVisible();
  });

  test("propose les actions envoyer et demander de l'argent", async ({ dashboardPage }) => {
    await expect(dashboardPage.boutonEnvoyer).toBeVisible();
    await expect(dashboardPage.boutonDemander).toBeVisible();
  });

  test("le lien envoyer de l'argent ouvre le formulaire de virement", async ({ page, dashboardPage }) => {
    await dashboardPage.boutonEnvoyer.click();
    await expect(page).toHaveURL(/\/transactions\/new/);

    const newTransactionPage = new NewTransactionPage(page);
    await expect(newTransactionPage.champMontant).toBeVisible();
  });
});
