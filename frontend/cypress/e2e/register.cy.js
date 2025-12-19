describe("Registratie Test", () => {
  it("zou een succesvol registratie verzoek moeten sturen en doorsturen", () => {
    // 1. Onderschep het POST verzoek naar /api/users
    cy.intercept("POST", "**/api/users", { 
      statusCode: 201,
      body: { 
        token: "fake-jwt-token",
        user: { id: 1, name: "Brihan", email: "pipo@f1site.com" }, 
      },
    }).as("registerCall");

    // 2. Bezoek de pagina
    cy.visit("/register");

    // 3. Vul het formulier in
    cy.get("[data-cy=user_input]").type("Brihan");
    cy.get("[data-cy=data_input]").type("1985-01-10");
    cy.get("[data-cy=email_input]").type("pipo@f1site.com");
    
    // Zorg voor een STERK wachtwoord: 
    // Hoofdletter (P), Cijfer (1), Speciaal teken (!), minstens 6 tekens.
    cy.get("[data-cy=password_input]").type("Pipo123!"); 

    // 4. Klik op de knop (alleen als deze niet meer disabled is)
    cy.get("button[type=submit]")
      .should("not.be.disabled")
      .click();

    // 5. Wacht tot de API-call is afgehandeld
    cy.wait("@registerCall");

    // 6. Controleer of de navigatie naar profile werkt
    cy.url().should("include", "/profile");
    
    // Optioneel: check of de succes-toast verschijnt
    cy.contains("Registratie succesvol").should("be.visible");
  });
  it("zou de verzendknop uitgeschakeld moeten houden bij een zwak wachtwoord", () => {
    cy.visit("/register");

    cy.get("[data-cy=user_input]").type("Brihan");
    cy.get("[data-cy=email_input]").type("pipo@f1site.com");
  
    // We typen een wachtwoord zonder hoofdletter en speciaal teken
    cy.get("[data-cy=password_input]").type("pipo123");

    // De button moet disabled blijven volgens jouw logica: !strength.isStrong
    cy.get("button[type=submit]").should("be.disabled");

    // Controleer of de lijst met vereisten (rood) zichtbaar is
    cy.contains("Minimaal 1 hoofdletter").should("be.visible");
    cy.contains("Minimaal 1 speciaal teken").should("be.visible");
  });
 
});