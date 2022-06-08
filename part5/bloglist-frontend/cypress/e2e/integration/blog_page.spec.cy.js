describe('blog page', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'New User',
      username: 'groot',
      password: 'groot'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const secondUser =  {
      name: 'Second User',
      username: 'bloop',
      password: 'bloop'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', secondUser)

    cy.visit('http://localhost:3000')

    cy.get('#login-btn')

    cy.get('#username').type('groot')
    cy.get('#password').type('groot')
    cy.get('#login-btn').click()
  })

  it('logged in user can create a new blog', () => {
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

  it('user is able to like a blog', () => {
    cy.get('.togglabel').contains('new blog').click()
    cy.get('#title').type('Blog Title')
    cy.get('#author').type('Blog Author')
    cy.get('#url').type('www.blog.com')

    cy.get('.create-blog-btn').click()

    cy.get('#view-hide-btn').click()
    cy.get('.blog-likes').contains('0')
    cy.get('.like-btn').click()
    cy.get('.blog-likes').contains('1')
  })
})