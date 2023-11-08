describe('Login', () => {

  beforeEach(() => {
    cy.visit('/login');
    cy.contains('Login');
  })

  it('should display a hint when password forgotten link is clicked', () => {
    let einPasswortResetKann = 'Ein Passwort-Reset kann';
    cy.get('body').should('not.contain', einPasswortResetKann);
    cy.contains('Passwort vergessen').click()
    cy.contains(einPasswortResetKann).should('be.visible')
  })

  it('should display an error message when wrong credentials are submitted', () => {
    cy.get('input[formControlName="username"]').type('invalidUser');
    cy.get('input[formControlName="password"]').type('invalidPass');
    cy.get('button[type="submit"]').click();
    cy.contains('Ungültiger Benutzername oder Passwort.').should('be.visible');
  })

  it('should submit the form when Enter is pressed', () => {
    cy.get('input[formControlName="username"]').type('invalidUser');
    cy.get('input[formControlName="password"]').type('invalidPass{enter}');
    cy.contains('Ungültiger Benutzername oder Passwort.').should('be.visible');
  })

  it('should redirect to /events when user logs in', () => {
    cy.login()
    cy.contains('Termine')
    cy.url().should('include', '/events')
  })

})
