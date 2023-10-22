describe('Blog app', function() {
  const credentials1 = { username: 'tester', password: 'pass' }
  const credentials2 = { username: 'anotherUser', password: 'pass' }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', credentials1)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to Application')
    cy.get('input').should('have.length', 3)
    cy.get('input[type=submit]').should('have.value', 'Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type(credentials1.username)
      cy.get('input[type=password]').type(credentials1.password)
      cy.get('input[type=submit]').click()

      cy.get('button:first').should('have.text', 'Log out')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type(credentials1.username)
      cy.get('input[type=password]').type('wrong')
      cy.get('input[type=submit]').click()

      cy.get('body').should('contain', 'Wrong Username or Password')
    })
  })

  describe('When logged in', function() {

    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', credentials1)
        .then(response => {
          localStorage.setItem('blogAppUser', JSON.stringify(response.body))
          cy.visit('http://localhost:5173')
        })
    })

    it('is possible to create a blog', function() {
      const blog = {
        title: 'recognizable',
        author: 'jesus',
        url: 'https://google.com'
      }

      cy.get('button.primary').click()
      cy.get('input:first').type(blog.title)
      cy.get('input:nth(1)').type(blog.author)
      cy.get('input:nth(2)').type(blog.url)
      cy.get('[type=submit]').click()

      cy.get('.blog-container').should('contain', blog.title).and('contain', blog.author)
    })

    it('is possible to like a blog', function() {
      const blog = {
        title: 'blogtitle',
        author: 'some dude',
        url: 'https://google.com'
      }

      cy.get('button.primary').click()
      cy.get('input:first').type(blog.title)
      cy.get('input:nth(1)').type(blog.author)
      cy.get('input:nth(2)').type(blog.url)
      cy.get('[type=submit]').click()

      cy.contains('Show more').click()
      cy.contains('0 Likes')
      cy.get('.blog-details button').contains('Like').click()
      cy.contains('1 Likes')
    })

    it('is possible to delete a blog', function() {
      const blog = {
        title: 'To be deleted',
        author: 'nobody',
        url: 'https://google.com'
      }

      cy.get('button.primary').click()
      cy.get('input:first').type(blog.title)
      cy.get('input:nth(1)').type(blog.author)
      cy.get('input:nth(2)').type(blog.url)
      cy.get('[type=submit]').click()

      cy.contains('Show more').click()
      cy.contains('Delete').click()
      cy.get('.blog-container').should('not.exist')
    })

    it('is not possible to see delete button when I am not the blog creator', function() {
      const initialUsersblog = {
        title: 'you cannot',
        author: 'delete me',
        url: 'https://google.com'
      }

      cy.get('button.primary').click()
      cy.get('input:first').type(initialUsersblog.title)
      cy.get('input:nth(1)').type(initialUsersblog.author)
      cy.get('input:nth(2)').type(initialUsersblog.url)
      cy.get('[type=submit]').click()

      cy.request('POST', 'http://localhost:3003/api/users', credentials2)
      cy.request('POST', 'http://localhost:3003/api/login', credentials2)
        .then(response => {
          localStorage.setItem('blogAppUser', JSON.stringify(response.body))
          cy.visit('http://localhost:5173')
        })
      cy.contains('Show more').click()
      cy.contains('Delete').should('not.exist')
    })

    it('is possible to order blogs by likes', function() {
      const blog1 = {
        title: 'Do not like me',
        author: 'not popular',
        url: '-',
      }
      cy.get('button.primary').click()
      cy.get('input:first').type(blog1.title)
      cy.get('input:nth(1)').type(blog1.author)
      cy.get('input:nth(2)').type(blog1.url)
      cy.get('[type=submit]').click()

      const blog2 = {
        title: 'Like me',
        author: 'popular',
        url: '-',
      }
      cy.get('button.primary').click()
      cy.get('input:first').type(blog2.title)
      cy.get('input:nth(1)').type(blog2.author)
      cy.get('input:nth(2)').type(blog2.url)
      cy.get('[type=submit]').click()

      cy.get('.blog-container').eq(1).contains('Show more').click()
      cy.get('.blog-container').eq(1).find('button').contains('Like').click()

      cy.get('.blog-container').eq(0).contains(blog1.title)
      cy.get('.blog-container').eq(1).contains(blog2.title)

      cy.contains('Sort by Likes').click()

      cy.get('.blog-container').eq(0).contains(blog2.title)
      cy.get('.blog-container').eq(1).contains(blog1.title)
    })
  })
})