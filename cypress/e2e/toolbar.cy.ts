describe('Toolbar', () => {

  beforeEach(() => {
    cy.login()
  })


  it('should contain an icon and dropdown menu with a logout link', () => {
    cy.get('button[aria-label="Angemeldeter Benutzer"]').click();  // Click the user icon
    cy.get('button mat-icon').contains('logout').parent().click();  // Click the logout icon in the dropdown
    cy.url().should('include', '/login')
    cy.contains('Login');
  })


})
