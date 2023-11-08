describe('Termine', () => {

  beforeEach(() => {
    cy.login()
  })


  it('should contain 20 items', () => {
    cy.visit('/events')
    cy.contains('Termine')
    cy.get('table mat-row').should('have.length', 20);
  })


})
