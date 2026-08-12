import { test, expect, request, APIRequestContext } from "@playwright/test";

// Tests API purs (sans navigateur) contre le backend ZotoBank, pour démontrer
// la double compétence UI + API testing sur la même application.
test.describe("API Transactions", () => {
  let contexteAuthentifie: APIRequestContext;

  test.beforeAll(async () => {
    contexteAuthentifie = await request.newContext({
      baseURL: "https://zotobank.zotomatise.com",
    });
    const reponse = await contexteAuthentifie.post("/api/auth/login", {
      data: { username: "johndoe", password: "s3cret" },
    });
    expect(reponse.ok()).toBeTruthy();
  });

  test.afterAll(async () => {
    await contexteAuthentifie.dispose();
  });

  test("refuse l'accès aux transactions sans authentification", async ({ request: requeteAnonyme }) => {
    const reponse = await requeteAnonyme.get("https://zotobank.zotomatise.com/api/transactions");
    expect(reponse.status()).toBe(401);
  });

  test("refuse la connexion avec un mauvais mot de passe", async ({ request: requeteAnonyme }) => {
    const reponse = await requeteAnonyme.post("https://zotobank.zotomatise.com/api/auth/login", {
      data: { username: "johndoe", password: "mauvais-mot-de-passe" },
    });
    expect(reponse.status()).toBe(401);
    const corps = await reponse.json();
    expect(corps.error).toBeTruthy();
  });

  test("retourne la liste paginée des transactions de l'utilisateur", async () => {
    const reponse = await contexteAuthentifie.get("/api/transactions?limit=3");
    expect(reponse.ok()).toBeTruthy();

    const corps = await reponse.json();
    expect(Array.isArray(corps.results)).toBe(true);
    expect(corps.results.length).toBeLessThanOrEqual(3);
    expect(corps.pageData).toMatchObject({ page: 1, limit: 3 });
  });

  test("filtre les transactions par terme de recherche", async () => {
    const reponse = await contexteAuthentifie.get("/api/transactions?search=Jane");
    expect(reponse.ok()).toBeTruthy();

    const corps = await reponse.json();
    for (const transaction of corps.results) {
      const contientJane =
        transaction.senderName.includes("Jane") || transaction.receiverName.includes("Jane");
      expect(contientJane).toBe(true);
    }
  });

  test("chaque transaction retournée a la forme attendue", async () => {
    const reponse = await contexteAuthentifie.get("/api/transactions?limit=1");
    const corps = await reponse.json();
    const [transaction] = corps.results;

    expect(transaction).toMatchObject({
      id: expect.any(String),
      senderId: expect.any(String),
      receiverId: expect.any(String),
      amount: expect.any(Number),
      status: expect.any(String),
      senderName: expect.any(String),
      receiverName: expect.any(String),
    });
  });
});
