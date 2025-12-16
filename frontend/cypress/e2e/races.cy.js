// cypress/e2e/calendar.cy.js

describe("Calendar Component met Fixture", () => {

  it("zou de kalender juist moeten weergeven en alle 3 races van fixture moeten tonen", () => {
    cy.intercept("GET", "/api/races", {
      statusCode: 200,
      fixture: "races.json",
    }).as("getRaces");
    cy.visit("http://localhost:5173/calendar"); 

    cy.wait("@getRaces");

    // Controleer of de kalender geladen is
    cy.get(".fc-toolbar-title").should("exist");

    cy.get(".fc-prev-button").click(); // naar november
    cy.get(".fc-prev-button").click(); // naar oktober
    cy.get(".fc-prev-button").click(); // naar september
    // ... herhaal dit tot je in de juiste maand bent.

    // 2. Controleer of je de juiste maandtitel ziet
    cy.get(".fc-toolbar-title").should("contain", "September 2025");
    
    // 1. Controleer of alle events uit de fixture zichtbaar zijn (3 stuks)
    cy.get(".fc-event-title").should("have.length", 1);

    // 2. Controleer de conversie en datum van het eerste event
    cy.get(".fc-event-title").should("be.visible")
      .contains("Italian Gp 2025");
  });

  it("zou naar de juiste race url moeten navigeren wanneer je klikt op een evenement", () => {
    cy.intercept("GET", "/api/races", {
      statusCode: 200,
      fixture: "races.json",
    }).as("getRaces");

    cy.visit("http://localhost:5173/calendar");

    cy.wait("@getRaces");

    cy.get(".fc-prev-button").click(); // naar november
    cy.get(".fc-prev-button").click(); // naar oktober
    cy.get(".fc-prev-button").click(); // naar september
    cy.get(".fc-prev-button").click(); // naar augustus
    cy.get(".fc-prev-button").click(); // naar juli
    cy.get(".fc-prev-button").click(); // naar juni
    cy.get(".fc-prev-button").click(); // naar mei
    cy.get(".fc-prev-button").click(); // naar april
    cy.get(".fc-prev-button").click(); // naar maart

    cy.get(".fc-event-title")
      .contains("Belgian Gp 2025")
      .click();

    // Controleer of de URL overeenkomt met de slug uit de fixture
    cy.url().should("include", "/races/belgian-gp-2025");
  });

  it("zou de detail pagina van een race moeten weergeven", () => {
    cy.intercept("GET", "api/races/belgian-gp-2025", {
      statusCode: 200,
      fixture: "raceDetail.json",
    }).as("getRaceDetails");

    // cy.intercept("GET", "http://localhost:3000/api/tracks", {
    //   fixture: "trackDetail.json",
    // }).as("getTrackDetail");

    cy.visit("http://localhost:5173/races/belgian-gp-2025");
    
    //cy.wait("@getTrackDetail");
    
    cy.wait("@getRaceDetails");
    
  });
});