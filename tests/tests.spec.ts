import { test, expect } from "@playwright/test";
import { Journey } from "../journey";

test("Checking all of the required dashboards.", async ({ page }) => {
  await Journey.journey(page);
});
