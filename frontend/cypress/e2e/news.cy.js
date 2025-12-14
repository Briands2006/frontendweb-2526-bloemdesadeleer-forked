describe("News Pagina", () => {
  beforeEach(() => {
    cy.login("fan@f1site.com", "testPassword2"); 
  });

  it("zou de lijst van nieuws artikelen correct moeten weergeven door de API te mocken", () => {

    cy.intercept("GET", "http://localhost:3000/api/news", {
      fixture: "news.json",
    }).as("getNews"); 

    cy.visit("http://localhost:5173/news");

    cy.get("h1").should("contain", "F1 News");

    cy.wait("@getNews");

    cy.fixture("news.json").then((news) => {

      cy.get(".grid").children().should("have.length", 2);

      cy.get(".grid").should("contain", news[0].title);

      cy.get(".grid").should("contain", news[1].title);

    });
  });

  it("zou de detailpagina van een nieuws artikel correct moeten weergeven na een klik", () => {

    cy.intercept("GET", "http://localhost:3000/api/news", {
      fixture: "news.json",
    }).as("getNews"); 

    cy.intercept("GET", "http://localhost:3000/api/news/n/", {
      fixture: "newsDetail.json",
    }).as("getNewsDetails");

    cy.visit("http://localhost:5173/news");
    cy.wait("@getNews");

    cy.get(".grid").contains("Verstappen wint de Grand Prix van België").click();

    cy.wait("@getNewsDetails");

    cy.get("div p").first().should("contain", "Max Verstappen");

    cy.url().should("include", "/drivers/max-verstappen");

  });
  
});