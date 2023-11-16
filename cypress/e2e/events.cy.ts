describe('Termine', () => {

  beforeEach(() => {
    cy.login()
  })


  it('should contain 20 items', () => {
    cy.visit('/events')
    cy.contains('Termine')
    cy.get('[data-cy="event.dateTime"]').should('have.length', 20);
  })

  it('should allow to jump to an event by clicking the row', () => {
    cy.intercept('GET', '/das-tool-rest/invitations', {fixture: 'invitations'});
    cy.intercept('GET', '/das-tool-rest/events/618/invitation', {fixture: 'event-618-invitation'});
    cy.intercept('GET', '/das-tool-rest/events/618/invitations', {fixture: 'event-618-invitations'});
    cy.visit('/events')
    cy.get('table tbody tr:nth-child(1)').click();
    // Assert the URL has changed
    cy.url().should('include', '/event/618');
  })

  it('should display the properties of an event', () => {
    cy.intercept('GET', '/das-tool-rest/invitations', {fixture: 'invitations'});
    cy.visit('/events')
    // Datum
    cy.get('[data-cy="event.dateTime"]').first().contains('Sa. 22.07. 12:00')
    // Team
    cy.get('[data-cy="team.name"]').first().contains('Juventus Urin')
    // Event-Summary
    cy.get('[data-cy="event.summary"]').first().contains('Turnier in Tirol')
    // Rückmeldungs-Status
    cy.get('[data-cy="statusIcon"]').first().contains('thumb_up')
  })

  it('should allow to update the invitation', () => {
    cy.intercept('GET', '/das-tool-rest/invitations', {fixture: 'invitations'});
    cy.visit('/events')
    cy.get('[data-cy="statusIcon"]').first().click()
    cy.get('[data-cy="statusSelect"]').find('option').each((option, index) => {
      const expectedTexts = ["Bin dabei", "Komme vielleicht", "Komme nicht"];
      expect(option).to.have.text(expectedTexts[index]);
    });

    // now select the second option and verify the generated backend request
    cy.intercept('POST', '/das-tool-rest/invitations').as('updateInvitation');
    cy.get('[data-cy="statusSelect"]').select('Komme vielleicht')
    // Assert the request body
    cy.wait('@updateInvitation').its('request.body').should('deep.equal', {
      id: 25854,
      status: "UNSURE",
      comment: null
    });

    // Rückmeldungs-StatusIcon hat sich geändert
    cy.get('[data-cy="statusIcon"]').first().contains('thumbs_up_down')

  })

  it('should not allow to update the invitation of a past event', () => {
    cy.intercept('GET', '/das-tool-rest/invitations', {fixture: 'invitations'});
    cy.visit('/events')
    // click second invitation
    cy.get('[data-cy="statusIcon"]').eq(1).click();

    // Wait for the snackbar to appear and assert its presence
    cy.get('.mat-mdc-snack-bar-label') // Replace '.snackbar-selector' with the actual selector for your snackbar
      .should('be.visible')
      .and('contain.text', 'Keine Online-Rückmeldung mehr möglich.');
  })
})
