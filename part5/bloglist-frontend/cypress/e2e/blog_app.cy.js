describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'fgonza',
      password: 'fgonza123',
      name: 'Facundo Gonzalez'
    })
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'fgonza2',
      password: 'fgonza2123',
      name: 'Facundo Gonzalez 2'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', async function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('fgonza')
      cy.get('#password').type('fgonza123')
      cy.get('#login-button').click()
      cy.contains('Facundo Gonzalez logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('fgonza')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.fails')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'fgonza', password: 'fgonza123' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('Blog 1')
      cy.get('#author-input').type('Author 1')
      cy.get('#url-input').type('Url 1')
      cy.get('#submit-bttn').click()
      cy.contains('a new blog Blog 1 by Author 1 added')
      cy.contains('Blog 1 Author 1')
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Blog 1', author: 'Author 1', url: 'Url 1' })
      })

      it('it can be liked', function() {
        cy.contains('Blog 1').parent().as('theBlog')
        cy.get('@theBlog').find('.blogTitleAuthorBttn').click()
        cy.get('@theBlog').find('.likeBttn').click()
        cy.get('@theBlog').contains('likes 1')
      })

      it('it can be deleted by the user who created it', function() {
        cy.contains('Blog 1').parent().as('theBlog')
        cy.get('@theBlog').find('.blogTitleAuthorBttn').click()
        cy.get('@theBlog').find('.removeBttn').click()
        cy.get('html').should('not.contain', 'Blog 1 Author 1')
      })

      it('it cannot be deleted by one user who does not create it', function() {
        cy.contains('logout').click()
        cy.login({ username: 'fgonza2', password: 'fgonza2123' })
        cy.contains('Blog 1').parent().as('theBlog')
        cy.get('@theBlog').find('.blogTitleAuthorBttn').click()
        cy.get('@theBlog').should('not.contain', 'remove')
      })
    })
  })
})