describe('Home page', () => {

  it('Homepage redirects to Login page', () => {
    cy.visit('/')
    cy.contains('Login')
    cy.url().should('include', '/login')
  })

  it('should display error if connection to backend fails', () => {
    cy.intercept('GET', '/das-tool-rest/**', { forceNetworkError: true })
    cy.visit('/')
    cy.get('.mdc-snackbar__label')
      .contains('Fehler beim Zugriff auf den Server: ')

  })

})
