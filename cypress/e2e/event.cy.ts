describe('Termin', () => {

  beforeEach(() => {
    cy.login()
    cy.intercept('GET', '/das-tool-rest/events/618/invitation', {fixture: 'event-618-invitation'});
    cy.intercept('GET', '/das-tool-rest/events/618/invitations', {fixture: 'event-618-invitations'});
    cy.visit('/event/618')
  })

  it('should contain back link', () => {
    cy.contains('Übersicht').click()
    cy.url().should('include', '/events')
  })

  it('should display event details', () => {
    cy.contains('Termin')
    cy.contains('Datum')
    cy.contains('Do. 22.07.32, 12:00')
    cy.contains('Team')
    cy.contains('Juventus Urin')
    cy.contains('Typ')
    cy.contains('Turnier')
    cy.contains('Titel')
    cy.contains('30 Jahre OTO Sendling')
  })

  it('should display invitations status of other players', () => {
    cy.contains('Zusagen (1)')
    cy.get('.zusage').eq(0).contains('Busti')
    // check comment
    cy.get('.zusage').eq(0).contains('Coole Geschichte')
    cy.contains('Vielleicht (1)')
    cy.get('.vielleicht').eq(0).contains('Horsti')
    cy.get('.vielleicht').eq(0).contains('Laut Whatsapp')
    // check that comment from manager is marked accordingly
    cy.get('.vielleicht').eq(0).contains('Busti')
    cy.contains('Absagen (1)')
    cy.get('.absage').eq(0).contains('Knipsi')
  })

  it('should allow to change status of invitation', () => {
    cy.intercept('POST', '/das-tool-rest/invitations', {
      statusCode: 200,
      body: {},
    }).as('updateInvitation');
    cy.get('input[type="radio"]').eq(0).check();

    cy.wait('@updateInvitation').its('request.body').should('deep.equal', {
      id: 25854,
      status: "ACCEPTED",
      comment: "Tirola"
    });
  })

  it('should allow to change the comment of the invitation', () => {
    // When
    cy.intercept('POST', '/das-tool-rest/invitations', {
      statusCode: 200,
      body: {},
    }).as('updateInvitation');
    let comment = "Ein Kommentar";
    cy.get('textarea').clear().type(comment);

    cy.wait('@updateInvitation').its('request.body').should('deep.equal', {
      id: 25854,
      status: "UNSURE",
      comment: comment
    });
  })
})
