/// <reference types="cypress" />

context('As a user I want to log in', () => {
  beforeEach(() => {
    cy.visit('/search')
  })

  // https://on.cypress.io/interacting-with-elements

  it('fills search input bar and lists all avaible products', () => {
    // https://on.cypress.io/type
    cy.get('.search-bar')
      .type('product')
      .should('have.value', 'product');

    cy.get('.search').submit();

    cy.get('.product-card').should('have.length', 3)

    cy.get('.product-name("product 1")').should('exist')
    cy.get('.product-name("product 2")').should('exist')
    cy.get('.product-name("product 3")').should('exist')


    cy.location('pathname', { timeout: 500 }).should('eq', '/search-results');
  })

  it('fills search input bar and shows that nothing has been found', () => {
    // https://on.cypress.io/type
    cy.get('.search-bar')
      .type('xxxx')
      .should('have.value', 'xxxx');

    cy.get('.search').submit();

    cy.get('.product-card').should('have.length', 0)

    cy.get(".search-info-empty").should('be.visible');
    cy.get(".search-info-empty").should('have.text', "Could not find any products.")


    cy.location('pathname', { timeout: 500 }).should('eq', '/search-results');
  })

  it('does not fill search input bar and shows error message', () => {
    // https://on.cypress.io/type
    cy.get('.search-bar')
      .type('')
      .should('have.value', '');

    cy.get('.search').submit();

    cy.get(".search-info-error").should('be.visible');
    cy.get(".search-info-error").should('have.text', "Please fill search inputbar.")


    cy.location('pathname', { timeout: 500 }).should('eq', '/search');
  })

  it('fills search input bar with too many characters and shows error message', () => {
    // https://on.cypress.io/type
    cy.get('.search-bar')
      .type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      .should('have.value', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

    cy.get('.search').submit();

    cy.get(".search-info-error").should('be.visible');
    cy.get(".search-info-error").should('have.text', "Searching phrase is too long")


    cy.location('pathname', { timeout: 500 }).should('eq', '/search');
  })

  it('fills search input bar, checks searching by description and lists all avaible product', () => {
    // https://on.cypress.io/type
    cy.get('.search-bar')
      .type('desc')
      .should('have.value', 'desc');

    cy.get('.desc-search')
      .check()

    cy.get('.search').submit();

    cy.get('.product-card').should('have.length', 3)

    cy.get('.product-desc("desc asdasd")').should('exist')
    cy.get('.product-desc("desc asdasdsss")').should('exist')
    cy.get('.product-desc("desc asdasdaaaa")').should('exist')


    cy.location('pathname', { timeout: 500 }).should('eq', '/search-results');
  })
})
