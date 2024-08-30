import { expect, Page } from "@playwright/test";
import { DashboardsContent } from "./content/dashboardsContent";
import { LoginHandler } from "./loginHandler";

export class Journey {
  public static async journey(page: Page): Promise<void> {
    await LoginHandler.login(page);
    await this.checkDashboardPage(page);
    await this.searchForDashboard(page, "Quality Assurance");
    await this.checkQAPage(page);
    await this.traverseToNewDashboard(page, "Security vulnerabilities");
    await this.checkSecVulPage(page);
    await this.traverseToNewDashboard(page, "Team Dashboard (WIP)");
    await this.checkTeamDashboardWIPPage(page);
    await this.traverseToNewDashboard(page, "Team Performance");
    await this.checkTeamPerformancePage(page);
    await this.traverseToNewDashboard(page, "TCoE Dashboards");
    await this.checkTCOEDashboards(page);
    await this.traverseToNewDashboard(page, "TCoE Sandbox");
    await this.checkTCOESandbox(page);
    await this.traverseToNewDashboard(page, "Pull Request Age");
    await this.checkPullRequestAge(page);
    await this.traverseToNewDashboard(page, "Dependency Checker");
    await this.checkDependencyCheck(page);
    await this.traverseToNewDashboard(page, "Engineering");
    await this.checkEngineering(page);
    await this.traverseToNewDashboard(page, "Operational");
    await this.checkOperational(page);
  }

  private static async checkVisibleAndPresent(
    page: Page,
    selector: string,
    count: number,
  ): Promise<void> {
    try {
      const visibilityPromises: Promise<void>[] = Array.from(
        { length: count },
        (_, i: number) =>
          expect.soft(page.locator(selector).nth(i)).toBeVisible(),
      );
      const countPromise: Promise<void> = expect
        .soft(page.locator(selector))
        .toHaveCount(count);
      await Promise.all([...visibilityPromises, countPromise]);
    } catch (error) {
      console.error(
        `An error occurred while checking visibility and count of '${selector}':`,
        error,
      );
      throw error;
    }
  }

  private static async checkDashboardPage(page: Page): Promise<void> {
    await page.waitForSelector(`h1:text-is("${DashboardsContent.pageTitle}")`);
    await this.checkVisibleAndPresent(
      page,
      `div:text-is("${DashboardsContent.pageText}")`,
      1,
    );
  }

  private static async searchForDashboard(
    page: Page,
    searchTerm: string,
  ): Promise<void> {
    await page.fill(`.css-1mlczho-input-input`, searchTerm);
    await page.click(`a:text-is("${searchTerm}")`);
  }

  private static async traverseToNewDashboard(
    page: Page,
    searchTerm: string,
  ): Promise<void> {
    await page.click(`.css-6471wp:text-is("Dashboards")`);
    await this.checkDashboardPage(page);
    await this.searchForDashboard(page, searchTerm);
  }

  private static async checkCommonTabs(page: Page): Promise<void> {
    await Promise.all([
      this.checkVisibleAndPresent(page, `.css-6471wp:text-is("Home")`, 1),
      this.checkVisibleAndPresent(page, `.css-6471wp:text-is("Dashboards")`, 1),
      this.checkVisibleAndPresent(
        page,
        `.css-6471wp:text-is("DTSSE Software Engineering")`,
        1,
      ),
    ]);
  }

  private static async checkCommonTabsTCOE(page: Page): Promise<void> {
    await Promise.all([
      this.checkVisibleAndPresent(page, `.css-6471wp:text-is("Home")`, 1),
      this.checkVisibleAndPresent(page, `.css-6471wp:text-is("Dashboards")`, 1),
      this.checkVisibleAndPresent(
        page,
        `.css-6471wp:text-is("TCoE - Test Centre of Excellence")`,
        1,
      ),
    ]);
  }

  private static async checkCommonTabsWA(page: Page): Promise<void> {
    await Promise.all([
      this.checkVisibleAndPresent(page, `.css-6471wp:text-is("Home")`, 1),
      this.checkVisibleAndPresent(page, `.css-6471wp:text-is("Dashboards")`, 1),
      this.checkVisibleAndPresent(
        page,
        `.css-6471wp:text-is("Work Allocation")`,
        1,
      ),
    ]);
  }

  private static async checkUniqueTabs(
    page: Page,
    name: string,
  ): Promise<void> {
    await Promise.all([
      this.checkVisibleAndPresent(page, `.css-ddw7vq:text-is("${name}")`, 1),
      this.checkVisibleAndPresent(page, `h6:text-is("${name}")`, 1),
    ]);
  }

  private static async checkQAPage(page: Page): Promise<void> {
    await Promise.all([
      this.checkCommonTabs(page),
      this.checkUniqueTabs(page, "Quality Assurance"),
      this.checkVisibleAndPresent(page, `div:text-is("Team")`, 2),
      this.checkVisibleAndPresent(
        page,
        `div:text-is("Functional Test Length")`,
        1,
      ),
      this.checkVisibleAndPresent(
        page,
        `div:text-is("Nightly Functional Test Length")`,
        1,
      ),
      this.checkVisibleAndPresent(
        page,
        `div:text-is("Nightly Pipeline Success Rate")`,
        1,
      ),
      this.checkVisibleAndPresent(page, `div:text-is("Fortify Enabled")`, 1),
      this.checkVisibleAndPresent(page, `div:text-is("PACT Enabled")`, 1),
    ]);
  }

  private static async checkSecVulPage(page: Page): Promise<void> {
    await Promise.all([
      this.checkCommonTabs(page),
      this.checkVisibleAndPresent(
        page,
        `.css-ddw7vq:text-is("Security vulnerabilities")`,
        1,
      ),
      this.checkVisibleAndPresent(
        page,
        `h6:text-is("Common Vulnerabilities and Exposures (CVE) trends")`,
        1,
      ),
    ]);
  }

  private static async checkTeamDashboardWIPPage(page: Page): Promise<void> {
    await Promise.all([
      this.checkCommonTabs(page),
      this.checkVisibleAndPresent(
        page,
        `.css-ddw7vq:text-is("Team Dashboard (WIP)")`,
        1,
      ),
      this.checkVisibleAndPresent(page, `.dashboard-row:has-text("Github")`, 1),
      this.checkVisibleAndPresent(
        page,
        `.dashboard-row:has-text("Pipeline Health")`,
        1,
      ),
      this.checkVisibleAndPresent(page, `.dashboard-row:has-text("FinOps")`, 1),
      this.checkVisibleAndPresent(
        page,
        `.dashboard-row:has-text("Security")`,
        1,
      ),
    ]);
  }

  private static async checkTeamPerformancePage(page: Page): Promise<void> {
    await Promise.all([
      this.checkCommonTabs(page),
      this.checkUniqueTabs(page, "Team Performance"),
      this.checkVisibleAndPresent(page, `div:text-is("Team")`, 1),
      this.checkVisibleAndPresent(page, `div:text-is("Engineering")`, 1),
      this.checkVisibleAndPresent(page, `div:text-is("Quality Assurance")`, 1),
      this.checkVisibleAndPresent(page, `div:text-is("Delivery")`, 1),
      this.checkVisibleAndPresent(page, `div:text-is("Operational")`, 1),
    ]);
  }

  private static async checkTCOEDashboards(page: Page): Promise<void> {
    await Promise.all([
      this.checkCommonTabsTCOE(page),
      this.checkVisibleAndPresent(
        page,
        `.css-ddw7vq:text-is("TCoE Dashboards")`,
        1,
      ),
      this.checkVisibleAndPresent(page, `h6:text-is("Test Duration")`, 1),
      this.checkVisibleAndPresent(
        page,
        `h6:text-is("Failure Duration 3 months")`,
        1,
      ),
      this.checkVisibleAndPresent(page, `div:text-is("Team")`, 2),
      this.checkVisibleAndPresent(page, `div:text-is("Unit Test")`, 1),
      this.checkVisibleAndPresent(page, `div:text-is("Functional Test")`, 1),
      this.checkVisibleAndPresent(page, `div:text-is("FT Trend")`, 1),
      this.checkVisibleAndPresent(page, `div:text-is("Pact Provider")`, 1),
      this.checkVisibleAndPresent(page, `div:text-is("Pact Consumer")`, 1),
      this.checkVisibleAndPresent(page, `div:text-is("Success Duration")`, 1),
      this.checkVisibleAndPresent(page, `div:text-is("Failure Duration")`, 1),
      this.checkVisibleAndPresent(page, `div:text-is("Failure Trend 2w")`, 1),
    ]);
  }

  private static async checkTCOESandbox(page: Page): Promise<void> {
    await Promise.all([
      this.checkCommonTabsTCOE(page),
      this.checkVisibleAndPresent(
        page,
        `.css-ddw7vq:text-is("TCoE Sandbox")`,
        1,
      ),
      this.checkVisibleAndPresent(page, `h6:text-is("Panel Title")`, 1),
    ]);
  }

  private static async checkPullRequestAge(page: Page): Promise<void> {
    await Promise.all([
      this.checkCommonTabsWA(page),
      this.checkVisibleAndPresent(
        page,
        `.css-ddw7vq:text-is("Pull Request Age")`,
        1,
      ),
      this.checkVisibleAndPresent(
        page,
        `h6:text-is("PR days to Close from Created Date")`,
        1,
      ),
      this.checkVisibleAndPresent(page, `h6:text-is("Panel Title")`, 1),
    ]);
  }

  private static async checkDependencyCheck(page: Page): Promise<void> {
    await Promise.all([
      this.checkCommonTabs(page),
      this.checkVisibleAndPresent(
        page,
        `.css-ddw7vq:text-is("Dependency Checker")`,
        1,
      ),
      this.checkVisibleAndPresent(page, `h6:text-is("New Panel")`, 1),
      this.checkVisibleAndPresent(page, `div:text-is("id")`, 1),
      this.checkVisibleAndPresent(
        page,
        `div:text-is("has_dependabot_or_renovate")`,
        1,
      ),
    ]);
  }

  private static async checkEngineering(page: Page): Promise<void> {
    await Promise.all([
      this.checkCommonTabs(page),
      this.checkVisibleAndPresent(
        page,
        `.css-ddw7vq:text-is("Engineering")`,
        1,
      ),
      this.checkVisibleAndPresent(page, `h6:text-is("Engineering")`, 1),
      this.checkVisibleAndPresent(page, `div:text-is("Team")`, 2),
      this.checkVisibleAndPresent(
        page,
        `div:text-is("Repos Without Renovate")`,
        1,
      ),
      this.checkVisibleAndPresent(
        page,
        `div:text-is("Deprecated Helm Charts")`,
        1,
      ),
    ]);
  }

  private static async checkOperational(page: Page): Promise<void> {
    await Promise.all([
      this.checkCommonTabs(page),
      this.checkVisibleAndPresent(
        page,
        `.css-ddw7vq:text-is("Operational")`,
        1,
      ),
      this.checkVisibleAndPresent(page, `h6:text-is("Operational")`, 1),
      this.checkVisibleAndPresent(page, `div:text-is("Team")`, 2),
      this.checkVisibleAndPresent(
        page,
        `div:text-is("Pipeline Success Rate")`,
        1,
      ),
      this.checkVisibleAndPresent(
        page,
        `div:text-is("Average Pipeline Length")`,
        1,
      ),
      this.checkVisibleAndPresent(
        page,
        `div:text-is("Incidents Per Deployment")`,
        1,
      ),
    ]);
  }
}
