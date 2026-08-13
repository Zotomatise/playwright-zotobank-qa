import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["html", { open: "never" }], ["list"]] : "list",
  use: {
    baseURL: "https://zotobank.zotomatise.com",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        // Bug connu Playwright+Firefox sur les runners GitHub Actions : la
        // résolution DNS essaie l'IPv6 en premier et reste bloquée quand
        // l'egress IPv6 du runner est cassé vers l'hôte cible, jusqu'au
        // timeout (30s, systématique sur CHAQUE test, pas un flake ponctuel).
        launchOptions: {
          firefoxUserPrefs: {
            "network.dns.disableIPv6": true,
          },
        },
      },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
