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

  it.only('logged in user can create a new blog', () => {
    cy.get('#username').type('groot')
    cy.get('#password').type('groot')
    cy.get('#login-btn').click()

    cy.get('.togglabel').contains('new blog').click()
    cy.get('#title').type('Blog Title')
    cy.get('#author').type('Blog Author')
    cy.get('#url').type('www.blog.com')

    cy.get('.create-blog-btn').click()

    cy.get('#notification').contains('A new blog was created: Blog Title by Blog Author')
    cy.get('.blog').contains('Blog Title - Blog Author')
    cy.get('#view-hide-btn')
    cy.get('#remove-btn')
  })
})