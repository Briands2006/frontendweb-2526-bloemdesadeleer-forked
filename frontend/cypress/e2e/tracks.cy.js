describe("Track Pagina", () => {
  beforeEach(() => {
    cy.login("fan@f1site.com", "testPassword2"); 
  });

  it("zou de lijst van F1-tracks correct moeten weergeven door de API te mocken", () => {

    cy.intercept("GET", "http://localhost:3000/api/tracks", {
      fixture: "tracks.json",
    }).as("getTracks"); 

    cy.visit("http://localhost:5173/tracks");

    cy.get("h1").should("contain", "F1 Tracks 2025");

    cy.wait("@getTracks");

    cy.get(".track-grid").children().should("have.length", 3);

  });

  it("zou de detailpagina van een track correct moeten weergeven na een klik", () => {

    cy.intercept("GET", "http://localhost:3000/api/tracks", {
      fixture: "tracks.json",
    }).as("getTracks"); 

    cy.intercept("GET", "http://localhost:3000/api/tracks/n/bahrain-international-circuit", {
      fixture: "trackDetail.json",
    }).as("getTrackDetails");

    cy.visit("http://localhost:5173/tracks");

    cy.wait("@getTracks");

    cy.get(".track-grid").contains("Bahrain International Circuit").click();

    cy.wait("@getTrackDetails");

    cy.get("div p").first().should("contain", "Bahrain International Circuit");

    cy.url().should("include", "/tracks/bahrain-international-circuit");

  });
  it("zou een track als favoriet moeten kunnen markeren wanneer ingelogd", () => {
    cy.intercept("GET", "**/api/tracks/n/bahrain-international-circuit", {
      fixture: "trackDetail.json",
    }).as("getDetails");

    // Mock de POST/PUT actie voor het favoriet maken (pas URL aan naar jouw API)
    // cy.intercept("POST", "**/api/favorites**", {
    //   statusCode: 200,
    //   body: { success: true },
    // }).as("toggleFav");

    cy.visit("http://localhost:5173/tracks/bahrain-international-circuit");
    cy.wait("@getDetails");

    // Check of de ster aanwezig is (omdat we in de beforeEach inloggen)
    // We gaan ervan uit dat de ster in de button zit
    cy.get("[data-cy=favorite-button]").should("exist");
  
    // Klik op de favoriet knop
    cy.get("[data-cy=favorite-button]").click();
  
    // Controleer of de API call is gemaakt
    // cy.wait("@toggleFav");

    // Controleer of de kleur veranderd is (gebaseerd op je Tailwind class)
    cy.get("[data-cy=favorite-button] svg").should("have.class", "text-yellow-400");
  });
  
});