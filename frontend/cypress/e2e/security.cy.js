describe("Security & Protected Routes", () => {
  it("zou een niet-ingelogde gebruiker van /profile naar /login moeten sturen", () => {
    cy.visit("/profile", { failOnStatusCode: false });
    cy.url().should("include", "/login");
  });

  it("zou een gewone gebruiker de toegang tot /admin-dashboard moeten ontzeggen", () => {

    cy.login("fan@f1site.com", "testPassword2");

    cy.intercept("GET", "**/api/users/me", {
      body: {
        id: 2,
        email: "fan@f1site.com",
        isAdmin: false,
      },
    }).as("getUserMe");

    cy.visit("/admin-dashboard", { failOnStatusCode: false });
    
    cy.url().should("not.include", "/admin-dashboard");
  });

  it("zou een admin wel toegang moeten verlenen tot het admin-dashboard", () => {
    cy.login("admin@f1site.com", "testPassword");

    cy.intercept("GET", "**/api/users/me", {
      body: {
        id: 1,
        email: "admin@f1site.com",
        isAdmin: true,
      },
    }).as("getAdminMe");

    cy.visit("/admin-dashboard");
    cy.wait("@getAdminMe");

    cy.url().should("include", "/admin-dashboard");
    cy.contains("Admin Dashboard").should("be.visible");
  });
});