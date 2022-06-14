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

    cy.login({ username: user.username, password: user.password })
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
    cy.createBlog({
      title: 'Blog Title',
      author: 'Blog Author',
      url: 'www.blog.com'
    })

    cy.get('#view-hide-btn').click()
    cy.get('.blog-likes').contains('0')
    cy.get('.like-btn').click()
    cy.get('.blog-likes').contains('1')
  })

  it('user that created a blog can delete it', () => {
    cy.createBlog({
      title: 'Blog Title',
      author: 'Blog Author',
      url: 'www.blog.com'
    })

    cy.get('#view-hide-btn').click()
    cy.get('#remove-btn').click()
    cy.on('window:confirm', () => true)

    cy.get('#notification').contains('Blog was successfully Deleted')
  })

  it('user that did not create the blog unable to delete it', () => {
    cy.createBlog({
      title: 'Blog Title',
      author: 'Blog Author',
      url: 'www.blog.com',
      likes: 0
    })

    cy.get('#logout-btn').click()
    cy.login({ username: 'bloop', password: 'bloop' })

    cy.get('#view-hide-btn').click()
    cy.get('#remove-btn').click()
    cy.on('window:confirm', () => true)

    cy.get('#notification').contains('Something went wrong')
  })

  it('blogs are ordered correctly based on likes', () => {
    cy.createBlog({
      title: 'Blog with Most',
      author: 'Blog Author',
      url: 'www.blog.com',
      likes: 100
    })
    cy.createBlog({
      title: 'Blog',
      author: 'Blog Author',
      url: 'www.blog.com',
      likes: 99
    })
    cy.createBlog({
      title: 'Blog with Least',
      author: 'Blog Author',
      url: 'www.blog.com',
      likes: 1
    })

    cy.get('.blog').eq(0).should('contain', 'Blog with Most')
    cy.get('.blog').eq(1).should('contain', 'Blog')
    cy.get('.blog').eq(2).should('contain', 'Blog with Least')
  })
})