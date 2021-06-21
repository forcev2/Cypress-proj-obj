/// <reference types="cypress" />

context('As a user I want to create auctions for my products', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('.email-field')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');

    cy.get('.password-field')
      .type('123')
      .should('have.value', '123');

    cy.get('login-form')
      .submit();

    cy.visit('/auction-creator');
  })

  // https://on.cypress.io/interacting-with-elements

  it('create auction and return to home page', () => {
    // https://on.cypress.io/type
    cy.get('.edit-auction-name')
      .type('name')
      .should('have.value', 'name');

    cy.get('.edit-auction-description')
      .type('desc')
      .should('have.value', 'desc');

    cy.get('.edit-auction-starting-price')
      .type('100')
      .should('have.value', '100');

    cy.get('.auction-form')
      .submit();

    cy.get('.success-prompt')
      .should('be.visible');

    cy.get('.success-prompt')
      .should('have.text', 'Sucesfully created new auction');

    cy.location('pathname', { timeout: 500 }).should('eq', '/');
  })

  it('tries to create an auction but fail because it didnt fill in all of the fields and shows error', () => {
    // https://on.cypress.io/type
    cy.get('.edit-auction-name')
      .type('')
      .should('have.value', '');

    cy.get('.edit-auction-description')
      .type('desc')
      .should('have.value', 'desc');

    cy.get('.edit-auction-starting-price')
      .type('100')
      .should('have.value', '100');

    cy.get('.auction-form')
      .submit();

    cy.get('.error-prompt')
      .should('be.visible');

    cy.get('.error-prompt')
      .should('have.text', 'Please fill in all of the information.');

    cy.location('pathname', { timeout: 500 }).should('eq', '/auction-creator');
  })


  it('tries to create an auction but fail because it fill in the starting price with negative number and shows error prompt', () => {
    // https://on.cypress.io/type
    cy.get('.edit-auction-name')
      .type('name')
      .should('have.value', 'name');

    cy.get('.edit-auction-description')
      .type('desc')
      .should('have.value', 'desc');

    cy.get('.edit-auction-starting-price')
      .type('-100')
      .should('have.value', '-100');

    cy.get('.auction-form')
      .submit();

    cy.get('.error-prompt')
      .should('be.visible');

    cy.get('.error-prompt')
      .should('have.text', 'Incorrect starting price, it cannot be negative.');

    cy.location('pathname', { timeout: 500 }).should('eq', '/auction-creator');
  })

  it('tries to create an auction but changes its mind and goes back to home page', () => {
    // https://on.cypress.io/type
    cy.get('.edit-auction-name')
      .type('name')
      .should('have.value', 'name');

    cy.get('.edit-auction-description')
      .type('desc')
      .should('have.value', 'desc');

    cy.get('.edit-auction-starting-price')
      .type('100')
      .should('have.value', '100');

    cy.get('.go-back-bttn').click();

    cy.location('pathname', { timeout: 500 }).should('eq', '/');
  })

  it('tries to create an auction but fail because the starting price is too big and shows error prompt', () => {
    // https://on.cypress.io/type
    cy.get('.edit-auction-name')
      .type('name')
      .should('have.value', 'name');

    cy.get('.edit-auction-description')
      .type('desc')
      .should('have.value', 'desc');

    cy.get('.edit-auction-starting-price')
      .type('1000000000000000000000000000000000000000000000000')
      .should('have.value', '1000000000000000000000000000000000000000000000000');

    cy.get('.auction-form')
      .submit();

    cy.get('.error-prompt')
      .should('be.visible');

    cy.get('.error-prompt')
      .should('have.text', 'Starting price is too big.');

    cy.location('pathname', { timeout: 500 }).should('eq', '/auction-creator');
  })

})
