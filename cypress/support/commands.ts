Cypress.Commands.add("login", () => {
  cy.visit("/login");
  cy.get('input[type="email"]').type("admin@mlcontrolplane.com");
  cy.get('input[type="password"]').type("admin123");
  cy.get('button[type="submit"]').click();
  cy.url().should("include", "/dashboard");
});
