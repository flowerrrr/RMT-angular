describe('Termine', () => {

  beforeEach(() => {
    cy.login()
  })


  it('should contain 20 items', () => {
    cy.visit('/events')
    cy.contains('Termine')
    cy.get('[data-cy="event.dateTime"]').should('have.length', 20);
  })


})
