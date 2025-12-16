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

    cy.fixture("tracks.json").then((tracks) => { 
      cy.get(".track-grid").children().should("have.length", 3);

      tracks.forEach((track) => {
        cy.get(".track-grid").should("contain", track.name);
      });
    });

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

    cy.url().should("include", "/tracks/n/bahrain-international-circuit");

  });
  
});