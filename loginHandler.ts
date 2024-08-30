import { expect, Page } from "@playwright/test";
import { config } from "./config";

export class LoginHandler {
  public static async login(page: Page): Promise<void> {
    await page.goto(
      "https://dtsse-grafana-aat-f6avdaarczcqftge.weu.grafana.azure.com/dashboards",
    );
    await page.fill(`.form-control`, config.username);
    await page.click(`.button_primary`);
    await page.waitForSelector(`div:text-is("Enter password")`);
    await page.fill(`.form-control`, config.password);
    await page.click(`.button_primary`);
    await page.waitForSelector(`div:text-is("Stay signed in?")`);
    await page.click(`#idSIButton9`);
    await expect(page).toHaveTitle("Dashboards - Grafana");
  }
}
