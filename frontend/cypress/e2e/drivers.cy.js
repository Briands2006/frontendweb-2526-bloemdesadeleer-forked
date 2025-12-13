describe("Drivers Pagina", () => {
  beforeEach(() => {
    cy.login("fan@f1site.com", "testPassword2"); 
  });

  it("zou de lijst van F1-coureurs correct moeten weergeven door de API te mocken", () => {

    cy.intercept("GET", "http://localhost:3000/api/drivers", {
      fixture: "drivers.json",
    }).as("getDrivers"); 

    cy.visit("http://localhost:5173/drivers");

    cy.get("h1").should("contain", "F1 Drivers 2025");

    cy.wait("@getDrivers");

    cy.fixture("drivers.json").then((drivers) => {

      cy.get(".drivers-grid").children().should("have.length", 3);

      cy.get(".drivers-grid").should("contain", drivers[0].name);
      cy.get(".drivers-grid").should("contain", drivers[0].team.name);

      cy.get(".drivers-grid").should("contain", drivers[2].name);
      cy.get(".drivers-grid").should("contain", drivers[2].team.name);
    });
  });

  it("zou de detailpagina van een coureur correct moeten weergeven na een klik", () => {

    cy.intercept("GET", "http://localhost:3000/api/drivers", {
      fixture: "drivers.json",
    }).as("getDrivers"); 

    cy.intercept("GET", "http://localhost:3000/api/drivers/n/max-verstappen", {
      fixture: "driverDetail.json",
    }).as("getDriverDetails");

    cy.intercept("GET", "http://localhost:3000/api/teams", {
      fixture: "teamDetail.json",
    }).as("getTeamDetail");

    cy.visit("http://localhost:5173/drivers");
    cy.wait("@getDrivers");

    cy.get(".drivers-grid").contains("Max Verstappen").click();

    cy.wait("@getDriverDetails");
    cy.wait("@getTeamDetail");

    cy.get("div p").first().should("contain", "Max Verstappen");

    cy.url().should("include", "/drivers/max-verstappen");

    cy.get("h2").contains("Bibliografie");
  });
  
});