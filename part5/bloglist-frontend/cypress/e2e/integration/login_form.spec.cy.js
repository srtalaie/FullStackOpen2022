describe('login form', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'New User',
      username: 'groot',
      password: 'groot'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', () => {
    cy.get('#login-btn')
  })

  it('user is able to successfully log in to the app', () => {
    cy.get('#login-btn')

    cy.get('#username').type('groot')
    cy.get('#password').type('groot')
    cy.get('#login-btn').click()

    cy.contains('New User is logged in')
  })

  it('user is not able to log in with incorrect un/pw', () => {
    cy.get('#login-btn')

    cy.get('#username').type('sproot')
    cy.get('#password').type('sproot')
    cy.get('#login-btn').click()

    cy.get('#notification').contains('Wrong credentials')
  })
})