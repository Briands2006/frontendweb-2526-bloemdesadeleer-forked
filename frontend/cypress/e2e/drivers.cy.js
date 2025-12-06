describe("Drivers Pagina", () => {

  it("zou de lijst van F1-coureurs correct moeten weergeven door de API te mocken", () => {
    
    // 1. Mock de API Oproep met behulp van de Fixture file
    // Cypress zal de inhoud van 'drivers.json' lezen en terugsturen
    // als de response van de GET-request naar '/api/drivers'.
    cy.intercept("GET", "http://localhost:3000/api/drivers", {
      fixture: "drivers.json",
    }).as("getDrivers"); 

    // 2. Bezoek de Pagina
    cy.visit("http://localhost:5173/drivers");

    cy.get("h1").should("contain", "F1 Drivers 2025");

    // 3. Wacht tot de gemockte oproep is voltooid
    cy.wait("@getDrivers");

    // Omdat we 3 drivers in de fixture hebben, verwachten we 3 kaarten.
    // We kunnen de fixture data ophalen om de lengte te controleren.
    cy.fixture("drivers.json").then((drivers) => {
      
      // Controleer of het aantal DriverCards overeenkomt met de mock data
      cy.get(".drivers-grid").children().should("have.length", 3);
        
      // Controleer of de details van de eerste driver correct worden weergegeven
      // Hier controleren we op de naam en het team van Max Verstappen
      cy.get(".drivers-grid").should("contain", drivers[0].name);
      cy.get(".drivers-grid").should("contain", drivers[0].team.name);
        
      // Controleer de derde driver (Leclerc) om te bewijzen dat alle data werkt
      cy.get(".drivers-grid").should("contain", drivers[2].name);
      cy.get(".drivers-grid").should("contain", drivers[2].team.name);
    });
  });
});