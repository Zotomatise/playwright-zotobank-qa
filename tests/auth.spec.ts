import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

test.describe("Authentification", () => {
  test("connecte un utilisateur avec des identifiants valides", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visiter();
    await loginPage.seConnecter("johndoe", "s3cret");
    await loginPage.attendreDashboard();

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.nomUtilisateurTopbar).toBeVisible();
  });

  test("refuse la connexion avec un mauvais mot de passe", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visiter();
    await loginPage.seConnecter("johndoe", "mauvais-mot-de-passe");

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByText(/incorrect/i)).toBeVisible();
  });

  test("refuse la connexion avec un utilisateur inconnu", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visiter();
    await loginPage.seConnecter("utilisateur-inexistant", "s3cret");

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByText(/incorrect/i)).toBeVisible();
  });

  test("déconnecte l'utilisateur et le renvoie vers le login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visiter();
    await loginPage.seConnecter("johndoe", "s3cret");
    await loginPage.attendreDashboard();

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.seDeconnecter();

    await expect(page).toHaveURL(/\/login/);
  });

  test("propose un lien vers l'inscription pour un nouvel utilisateur", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visiter();
    await expect(page.getByTestId("signup-link")).toBeVisible();
  });
});
