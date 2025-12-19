describe("Drivers Pagina", () => {
  beforeEach(() => {
    cy.login("fan@f1site.com", "testPassword2"); 
  });

  it("zou de lijst van F1-coureurs correct moeten weergeven door de API te mocken", () => {
    cy.intercept("GET", "http://localhost:3000/api/drivers", {
      fixture: "drivers.json",
    }).as("getDrivers"); 

    cy.visit("http://localhost:5173/drivers");

    // CRUCIAAL: Eerst wachten op de API, dan pas de UI checken
    cy.wait("@getDrivers");

    // Gebruik be.visible om te zorgen dat het laden klaar is
    cy.get("h1").should("be.visible").and("contain", "F1 Drivers 2025");

    cy.fixture("drivers.json").then((drivers) => {
      // Gebruik een timeout als de grid traag rendert
      cy.get(".drivers-grid", { timeout: 10000 }).children().should("have.length", 3);

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

    // Klikken op de specifieke coureur
    cy.get(".drivers-grid").contains("Max Verstappen").click();

    // Wachten op beide detail calls
    cy.wait(["@getDriverDetails", "@getTeamDetail"]);

    // Check of de naam ergens in de main sectie staat (veiliger dan div p)
    cy.get("main").should("contain", "Max Verstappen");
    cy.url().should("include", "/drivers/max-verstappen");
    cy.contains("h2", "Bibliografie").should("be.visible");
  });

  it("zou een foutmelding moeten tonen bij een API-fout", () => {
    cy.intercept("GET", "http://localhost:3000/api/drivers", {
      statusCode: 500,
      body: { message: "Fout bij het ophalen van coureurs" },
    }).as("getDriversError");

    cy.visit("http://localhost:5173/drivers");
    cy.wait("@getDriversError");

    // Check de error message. Als je AsyncData gebruikt, zit de tekst vaak gewoon in de body.
    cy.get("body").should("contain", "Fout");
    
    // De grid mag niet bestaan of mag geen kinderen hebben
    cy.get(".drivers-grid").should("not.exist");
  });
});