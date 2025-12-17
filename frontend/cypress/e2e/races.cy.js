describe("Calendar Component met Fixture", () => {
    
  // Functie om naar een specifieke maand te navigeren
  const navigateToMonth = (targetMonthYear) => {

    cy.get(".fc-toolbar-title", { timeout: 10000 }).should("exist"); // Wacht tot kalender geladen is
    let currentMonthYear = "";
        
    for (let i = 0; i < 24; i++) {
      cy.get(".fc-toolbar-title").invoke("text").then((text) => {
        currentMonthYear = text.trim();
        if (currentMonthYear === targetMonthYear) {
          return; // Stop de loop
        } else {
          // Als de maand nog niet correct is, klik op de vorige knop
          cy.get(".fc-prev-button").click();
        }
      });
            
      // Check de titel na het klikken
      let isFound = false;
      cy.get(".fc-toolbar-title").invoke("text").then((text) => {
        if (text.trim() === targetMonthYear) {
          isFound = true;
        }
      });
      if (isFound) break; 
    }

    // Uiteindelijke check om zeker te zijn dat we de juiste maand hebben
    cy.get(".fc-toolbar-title").should("contain", targetMonthYear);
  };

  beforeEach(() => {
    cy.intercept("GET", "/api/races", {
      statusCode: 200,
      fixture: "races.json",
    }).as("getRaces");

    cy.visit("http://localhost:5173/calendar");
    cy.wait("@getRaces");
  });

  it("zou de kalender juist moeten weergeven en alle 3 races van fixture moeten tonen", () => {
        
    // 1. Controleer of de kalender geladen is
    cy.get(".fc-toolbar-title").should("exist");
        
    // 2. Controleer of alle events uit de fixture zichtbaar zijn (3 stuks)
    // De races zijn in: maart 2025, september 2025 en juli 2024.
        
    // A. Ga naar september 2025
    navigateToMonth("September 2025");
        
    // Controleer of er 1 event is in september 2025
    cy.get(".fc-event-title").should("have.length", 1);
    cy.get(".fc-event-title").contains("Italian Gp 2025").should("be.visible");
        
    // B. Ga naar maart 2025
    cy.get(".fc-prev-button").click(); // naar augustus
    cy.get(".fc-prev-button").click(); // naar juli
    cy.get(".fc-prev-button").click(); // naar juni
    cy.get(".fc-prev-button").click(); // naar mei
    cy.get(".fc-prev-button").click(); // naar april
    cy.get(".fc-prev-button").click(); // naar maart
    // Navigatie met de for loop uit navigateToMonth zou veel properder zijn:
    // navigateToMonth("Maart 2025"); 
        
    cy.get(".fc-toolbar-title").should("contain", "March 2025");
    // Controleer of er 1 event is in maart 2025
    cy.get(".fc-event-title").should("have.length", 1);
    cy.get(".fc-event-title").contains("Belgian Gp 2025").should("be.visible");

    // C. Ga naar juli 2024
    // navigateToMonth("Juli 2024");
    // Nog 8 keer terugklikken...
    for (let i = 0; i < 8; i++) {
      cy.get(".fc-prev-button").click();
    }
        
    cy.get(".fc-toolbar-title").should("contain", "July 2024");
    // Controleer of er 1 event is in juli 2024
    cy.get(".fc-event-title").should("have.length", 1);
    cy.get(".fc-event-title").contains("Belgian Gp 2024").should("be.visible");
        
    // Totaal 3 races gecontroleerd over de maanden.
  });

  it("zou naar de juiste race url moeten navigeren wanneer je klikt op Italian GP 2025", () => {
        
    // Navigeer naar september 2025 waar de Italian GP is
    // Gebruik de functie of klik handmatig (zoals in je originele code)
    // navigateToMonth("September 2025");
    cy.get(".fc-prev-button").click(); // naar november
    cy.get(".fc-prev-button").click(); // naar oktober
    cy.get(".fc-prev-button").click(); // naar september
        
    cy.get(".fc-toolbar-title").should("contain", "September 2025");
        
    // Klik op het evenement
    cy.get(".fc-event-title")
      .contains("Italian Gp 2025")
      .click();

    // Controleer of de URL overeenkomt met de slug uit de fixture
    cy.url().should("include", "/races/italian-gp-2025");

    // Controleer of de detailpagina correct is geladen
    cy.get("header h1").contains("Italian GP 2025");
    cy.get("h2").should("contain", "Race Specificaties");
        
    // Optioneel: Controleer op een race-specifiek element (b.v. de datum)
    // Aangezien de titel en de slug gecontroleerd zijn, is dit meestal voldoende.
  });
});