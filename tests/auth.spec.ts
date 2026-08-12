import { test, expect } from "./fixtures";
import { LoginPage } from "../pages/LoginPage";

test.describe("Authentification", () => {
  test("connecte un utilisateur avec des identifiants valides", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visiter();
    await loginPage.seConnecter("johndoe", "s3cret");
    await loginPage.attendreDashboard();
  });

  test("refuse la connexion avec un mauvais mot de passe", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visiter();
    await loginPage.seConnecter("johndoe", "mauvais-mot-de-passe");

    await expect(page).toHaveURL(/\/login/);
    await expect(loginPage.messageErreur).toBeVisible();
  });

  test("refuse la connexion avec un utilisateur inconnu", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visiter();
    await loginPage.seConnecter("utilisateur-inexistant", "s3cret");

    await expect(page).toHaveURL(/\/login/);
    await expect(loginPage.messageErreur).toBeVisible();
  });

  test("déconnecte l'utilisateur et le renvoie vers le login", async ({ page, dashboardPage }) => {
    await dashboardPage.seDeconnecter();
    await expect(page).toHaveURL(/\/login/);
  });

  test("propose un lien vers l'inscription pour un nouvel utilisateur", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visiter();
    await expect(loginPage.lienInscription).toBeVisible();
  });
});
