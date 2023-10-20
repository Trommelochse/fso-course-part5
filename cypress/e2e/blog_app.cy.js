describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to Application')
    cy.get('input').should('have.length', 3)
    cy.get('input[type=submit]').should('have.value', 'Login')
  })
})