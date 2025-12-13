describe("General", () => {
  it("draait de app?", () => {
    cy.visit("http://localhost:5173");
    cy.get("h1").should("exist");
  });
});

it("should login", () => {
  cy.login("fan@f1site.com", "testPassword2"); // 👈 2
});

