describe("General", () => {
  it("draait de app?", () => {
    cy.visit("http://localhost:5173");
    cy.get("h1").should("exist");
  });
});

