describe('Blog app', function() {
  const credentials = { username: 'tester', password: 'pass' }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', credentials)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to Application')
    cy.get('input').should('have.length', 3)
    cy.get('input[type=submit]').should('have.value', 'Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type(credentials.username)
      cy.get('input[type=password]').type(credentials.password)
      cy.get('input[type=submit]').click()

      cy.get('button:first').should('have.text', 'Log out')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type(credentials.username)
      cy.get('input[type=password]').type('wrong')
      cy.get('input[type=submit]').click()

      cy.get('body').should('contain', 'Wrong Username or Password')
    })
  })
})