describe("Add and remove user", () => {
  it("should add a user", () => {
    cy.visit("http://localhost:5173/register");
    cy.get("[data-cy=user_input]").type("Brihan");
    cy.get("[data-cy=data_input]").type("1985-01-10");
    cy.get("[data-cy=email_input]").type("pipodeclown@f1site.com");
    cy.get("[data-cy=password_input]").type("123joepie");
  });
});