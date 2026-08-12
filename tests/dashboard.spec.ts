import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

test.describe("Dashboard", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visiter();
    await loginPage.seConnecter("janesmith", "s3cret");
    await loginPage.attendreDashboard();
    dashboardPage = new DashboardPage(page);
  });

  test("affiche la carte de solde", async () => {
    await expect(dashboardPage.carteSolde).toBeVisible();
  });

  test("affiche la liste des comptes bancaires", async () => {
    await expect(dashboardPage.comptesBancaires).toBeVisible();
  });

  test("affiche les transactions récentes", async () => {
    await expect(dashboardPage.transactionsRecentes).toBeVisible();
  });

  test("propose les actions envoyer et demander de l'argent", async () => {
    await expect(dashboardPage.boutonEnvoyer).toBeVisible();
    await expect(dashboardPage.boutonDemander).toBeVisible();
  });

  test("le lien envoyer de l'argent ouvre le formulaire de virement", async ({ page }) => {
    await dashboardPage.boutonEnvoyer.click();
    await expect(page).toHaveURL(/\/transactions\/new/);
    await expect(page.getByTestId("new-transaction-amount")).toBeVisible();
  });
});
