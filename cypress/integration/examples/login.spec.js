/// <reference types="cypress" />

context('As a user I want to log in', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  // https://on.cypress.io/interacting-with-elements

  it('login to web app and redirect to product page', () => {
    // https://on.cypress.io/type
    cy.get('.email-field')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');

    cy.get('.password-field')
      .type('123')
      .should('have.value', '123');

    cy.get('login-form')
      .submit();

    cy.location('pathname', { timeout: 500 }).should('eq', '/products');
  })

  it('login to web app and detect incorrect login and password', () => {

    cy.get('.email-field')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');

    cy.get('.password-field')
      .type('xxx')
      .should('have.value', 'xxx');

    cy.get('login-form')
      .submit();

    cy.get('.error-msg')
      .should('be.visible');

    cy.get('.error-msg')
      .should('have.text', 'Wrong username or password');

    cy.location('pathname', { timeout: 500 }).should('eq', '/login');
  })

  it('login to web app and detect empty fields', () => {

    cy.get('.email-field')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');


    cy.get('login-form')
      .submit();

    cy.get('.error-msg')
      .should('be.visible');

    cy.get('.error-msg')
      .should('have.text', 'Form contains empty fields');

    cy.location('pathname', { timeout: 500 }).should('eq', '/login');
  })

  it('login to web app and detect if trying to log in with old password', () => {
    cy.get('.email-field')
      .type('fake@email.com')
      .should('have.value', 'fake2@email.com');

    cy.get('.password-field')
      .type('old')
      .should('have.value', 'old');

    cy.get('login-form')
      .submit();

    cy.get('.error-msg')
      .should('be.visible');

    cy.get('.error-msg')
      .should('have.text', 'The password to the account has been changed recently. Please use new password');

    cy.location('pathname', { timeout: 500 }).should('eq', '/login');
  })

  it('login to web app with blocked accounnt ', () => {
    cy.get('.email-field')
      .type('blocked@email.com')
      .should('have.value', 'blocked@email.com');

    cy.get('.password-field')
      .type('xxx')
      .should('have.value', 'xxx');

    cy.get('login-form')
      .submit();

    cy.get('.error-msg')
      .should('be.visible');

    cy.get('.error-msg')
      .should('have.text', 'Your account has been blocked.');

    cy.location('pathname', { timeout: 500 }).should('eq', '/login');
  })

})
