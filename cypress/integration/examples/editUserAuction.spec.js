/// <reference types="cypress" />

context('As a user I want to edit my auctions', () => {
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

    cy.visit('/user/auction/123123/')

  })

  // https://on.cypress.io/interacting-with-elements

  it('succesfully edit user auction', () => {
    // https://on.cypress.io/type
    cy.get('.edit-auction').click();

    cy.get('.overlay')
      .should('be.visible');
    cy.get('.edit-form')
      .should('be.visible');

    cy.get('.edit-auction-name')
      .type('name')
      .should('have.value', 'name');

    cy.get('.edit-auction-description')
      .type('desc')
      .should('have.value', 'desc');

    cy.get('.edit-auction-starting-price')
      .type('100')
      .should('have.value', '100');

    cy.get('.success-prompt')
      .should('be.visible');

    cy.get('.success-prompt')
      .should('have.text', 'Edited auction');

    cy.get('.overlay')
      .should('not.be.visible');
    cy.get('.edit-form')
      .should('not.be.visible');

    cy.get('.edit-form')
      .submit();

    cy.location('pathname', { timeout: 500 }).should('eq', '/user/auction/123123/');
  })


  it('try to edit user auction and show error msg', () => {
    // https://on.cypress.io/type
    cy.get('.edit-auction').click();

    cy.get('.overlay')
      .should('be.visible');
    cy.get('.edit-form')
      .should('be.visible');

    cy.get('.edit-auction-name')
      .type('')
      .should('have.value', '');

    cy.get('.edit-auction-description')
      .type('desc')
      .should('have.value', 'desc');

    cy.get('.edit-auction-starting-price')
      .type('100')
      .should('have.value', '100');

    cy.get('.edit-form')
      .submit();

    cy.get('.error-prompt')
      .should('be.visible');

    cy.get('.overlay')
      .should('be.visible');
    cy.get('.edit-form')
      .should('be.visible');

    cy.get('.error-msg')
      .should('have.text', 'Fill in all of the fields');

    cy.location('pathname', { timeout: 500 }).should('eq', '/user/auction/123123/');
  })

  it('try to edit closed auction', () => {

    cy.get('.edit-auction').click();

    cy.get('.overlay')
      .should('not.be.visible');
    cy.get('.edit-form')
      .should('not.be.visible');

    cy.get('.error-prompt')
      .should('be.visible');

    cy.get('.error-msg')
      .should('have.text', 'You cant edit auctions that are already finished');

    cy.location('pathname', { timeout: 500 }).should('eq', '/user/auction/123123/');
  })

  it('try to edit starting price of auction that is already bidden on', () => {

    cy.get('.edit-auction').click();

    cy.get('.overlay')
      .should('be.visible');
    cy.get('.edit-form')
      .should('be.visible');

    cy.get('.edit-auction-name')
      .type('desc')
      .should('have.value', 'desc');

    cy.get('.edit-auction-description')
      .type('desc')
      .should('have.value', 'desc');

    cy.get('.edit-auction-starting-price')
      .type('1000')
      .should('have.value', '1000');

    cy.get('.edit-form')
      .submit();

    cy.get('.error-prompt')
      .should('be.visible');

    cy.get('.overlay')
      .should('be.visible');
    cy.get('.edit-form')
      .should('be.visible');

    cy.get('.error-msg')
      .should('have.text', 'You cant edit starting price of an auction thats already taking place.');

    cy.location('pathname', { timeout: 500 }).should('eq', '/user/auction/123123/');
  })

  it('try to edit blocked auction', () => {

    cy.get('.edit-auction').click();

    cy.get('.overlay')
      .should('not.be.visible');
    cy.get('.edit-form')
      .should('not.be.visible');

    cy.get('.error-prompt')
      .should('be.visible');

    cy.get('.error-msg')
      .should('have.text', 'This auction is blocked. Please contact support.');

    cy.location('pathname', { timeout: 500 }).should('eq', '/user/auction/123123/');
  })

})
