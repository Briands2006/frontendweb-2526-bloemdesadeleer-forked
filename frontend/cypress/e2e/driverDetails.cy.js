import { JWT_TOKEN_KEY } from "../../src/context/auth";

describe("Driver Detailpagina", () => {
  it("zou details van driver moeten weergeven na inloggen", () => {

    cy.window().then((win) => {
      // Gebruik een willekeurige, niet-lege string.
      win.localStorage.setItem(JWT_TOKEN_KEY, "test-jwt-token-voor-cypress");
    });

    cy.intercept(
      "GET",
      "http://localhost:3000/api/drivers", {
        fixture: "drivers.json",
      }).as("getDrivers");

    cy.intercept("GET", "http://localhost:3000/api/drivers/max-verstappen", {
      fixture: "driverDetail.json",
    }).as("getMaxDetails");

    cy.intercept("GET", "http://localhost:3000/api/teams/1", {
      fixture: "teamDetail.json",
    }).as("getTeamDetail");

    cy.visit("http://localhost:5173/drivers");
    cy.wait("@getDrivers");

    cy.wait("@getMaxDetails");

    cy.contains("p", "Max Verstappen").click();

    cy.url().should("include", "/drivers/max-verstappen");

    cy.get("p").should("contain", "Max Verstappen");

  });

} );