describe("Dashboard", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should display the dashboard page with header", () => {
    cy.contains("Dashboard").should("be.visible");
    cy.contains("Overview of your ML platform").should("be.visible");
  });

  it("should display stat cards", () => {
    cy.contains("Active Models").should("be.visible");
    cy.contains("Running Experiments").should("be.visible");
    cy.contains("Active Deployments").should("be.visible");
    cy.contains("Pipeline Runs").should("be.visible");
  });

  it("should display monitoring charts", () => {
    cy.contains("Latency (P95)").should("be.visible");
    cy.contains("Throughput").should("be.visible");
    cy.contains("Provider Latency").should("be.visible");
  });

  it("should navigate to System Health", () => {
    cy.contains("System Health").click();
    cy.url().should("include", "/system-health");
    cy.contains("Monitor the health").should("be.visible");
  });

  it("should navigate to Model Registry", () => {
    cy.contains("Model Registry").click();
    cy.url().should("include", "/models");
  });

  it("should navigate to Providers", () => {
    cy.contains("Providers").click();
    cy.url().should("include", "/providers");
    cy.contains("Monitor realtime health").should("be.visible");
  });

  it("should navigate to Observability", () => {
    cy.contains("Observability").click();
    cy.url().should("include", "/observability");
    cy.contains("Monitor metrics").should("be.visible");
  });

  it("should toggle dark mode", () => {
    cy.get("html").then(($html) => {
      const initialTheme = $html.attr("class");
      cy.contains("button", /dark|light|system/i).click();
      cy.get("html").should(($html2) => {
        expect($html2.attr("class")).not.to.eq(initialTheme);
      });
    });
  });
});
