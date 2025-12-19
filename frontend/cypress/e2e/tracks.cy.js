describe("Track Pagina", () => {
  beforeEach(() => {
    cy.login("fan@f1site.com", "testPassword2");
    cy.intercept("GET", "**/api/tracks", { fixture: "tracks.json" }).as("getTracks");
  });

  it("navigeert naar detailpagina", () => {
    cy.intercept("GET", "**/api/tracks/n/bahrain-international-circuit", {
      fixture: "trackDetail.json",
    }).as("getTrackDetails");

    cy.visit("/tracks");
    cy.wait("@getTracks");

    cy.contains("Bahrain International Circuit").click();
    cy.wait("@getTrackDetails");

    cy.url().should("include", "/tracks/bahrain-international-circuit");

    // We zoeken nu naar de tekst in de container, aangezien h1 ontbrak
    // Of gebruik h1 als je de code hierboven hebt aangepast
    cy.get("main").contains("Bahrain International Circuit").should("be.visible");
  });

  it("kan een track als favoriet markeren", () => {
    // 1. Initiële data laden
    cy.intercept("GET", "**/api/tracks/n/bahrain-international-circuit", {
      fixture: "trackDetail.json",
    }).as("getDetails");

    // 2. Mock de PATCH actie
    cy.intercept("PATCH", "**/api/users/me/favorites/track", {
      statusCode: 200,
      body: { trackId: "123", favorite: true }, // Of wat je backend stuurt
    }).as("toggleFav");

    // 3. CRUCIAAL: Mock de GET /me call die NA de patch komt
    // Zorg dat 'favorieteTracks' in de body de ID bevat van Bahrain
    cy.intercept("GET", "**/api/users/me", {
      body: {
        id: 1,
        email: "fan@f1site.com",
        favoriteTracks: [{ id: "123", slug: "bahrain-international-circuit" }],
      },
    }).as("getMeUpdated");

    cy.visit("/tracks/bahrain-international-circuit");
    cy.wait("@getDetails");

    // 4. Actie
    cy.get("[data-cy=favorite-button]").should("be.visible").click();

    // 5. Wachten op beide calls
    cy.wait("@toggleFav");
    cy.wait("@getMeUpdated");

    // 6. Check de class
    // Gebruik 'include' omdat er vaak meerdere classes op staan
    cy.get("[data-cy=favorite-button] svg")
      .should("have.class", "text-yellow-400");
  });
});