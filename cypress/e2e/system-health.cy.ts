describe("System Health", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/system-health");
  });

  it("should display overview section with KPI cards", () => {
    cy.contains("Overview").should("be.visible");
    cy.contains("Active Models").should("be.visible");
    cy.contains("Avg Latency").should("be.visible");
    cy.contains("Success Rate").should("be.visible");
  });

  it("should display provider health grid", () => {
    cy.contains("Provider Health").should("be.visible");
    cy.contains("OpenAI").should("be.visible");
    cy.contains("Claude").should("be.visible");
    cy.contains("Gemini").should("be.visible");
  });

  it("should display infrastructure status", () => {
    cy.contains("Infrastructure Status").should("be.visible");
    cy.contains("GPU Cluster").should("be.visible");
    cy.contains("Vector DB").should("be.visible");
  });

  it("should display activity feed", () => {
    cy.contains("Activity Feed").should("be.visible");
    cy.contains("events").should("be.visible");
  });

  it("should show live indicator", () => {
    cy.contains("Live").should("be.visible");
  });
});
