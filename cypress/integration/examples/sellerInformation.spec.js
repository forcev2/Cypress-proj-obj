/// <reference types="cypress" />

context('As a user I want to view Sellers information', () => {
  beforeEach(() => {

  })

  // https://on.cypress.io/interacting-with-elements

  it('check full sellers information via auction and go back to auction', () => {
    // https://on.cypress.io/type
    cy.visit('/auction/1')

    cy.get('.seller-profile').click();
    cy.location('pathname', { timeout: 500 }).should('eq', '/seller/1');

    cy.get('.contact-info')
      .should('be.visible');

    cy.get('.descrption')
      .should('be.visible');

    cy.get('.full-name')
      .should('be.visible');

    cy.get('.all-auctions')
      .should('be.visible');

    cy.get('.bo-back-bttn').click();
    cy.location('pathname', { timeout: 500 }).should('eq', '/auction/1');
  })

  it('check information of a seller with contact info hidden and go back to auction', () => {
    // https://on.cypress.io/type
    cy.visit('/auction/2')

    cy.get('.seller-profile').click();
    cy.location('pathname', { timeout: 500 }).should('eq', '/seller/2');

    cy.get('.contact-info')
      .should('not.be.visible');

    cy.get('.contact-hidd-info')
      .should('be.visible');

    cy.get('.contact-hidd-info')
      .should('have.text', 'Seller hidden his contact information.');

    cy.get('.descrption')
      .should('be.visible');

    cy.get('.full-name')
      .should('be.visible');

    cy.get('.all-auctions')
      .should('be.visible');

    cy.get('.bo-back-bttn').click();
    cy.location('pathname', { timeout: 500 }).should('eq', '/auction/2');
  })

  it('check information of a seller that is blocked and go back to auction', () => {
    // https://on.cypress.io/type

    cy.visit('/auction/3')

    cy.get('.seller-profile').click();
    cy.visit('/seller/12')

    cy.get('.contact-info')
      .should('not.be.visible');

    cy.get('.descrption')
      .should('not.be.visible');

    cy.get('.full-name')
      .should('not.be.visible');

    cy.get('.all-auctions')
      .should('not.be.visible');

    cy.get('.info-prompt')
      .should('be.visible');

    cy.get('.contact-hidd-info')
      .should('have.text', 'SELLER IS BLOCKED.');

    cy.get('.bo-back-bttn').click();
    cy.location('pathname', { timeout: 500 }).should('eq', '/auction/3');
  })

  it('check information of a seller that has its profile turned to private and go back to auction', () => {
    // https://on.cypress.io/type
    cy.visit('/auction/5')

    cy.get('.seller-profile').click();
    cy.visit('/seller/13')

    cy.get('.contact-info')
      .should('not.be.visible');

    cy.get('.descrption')
      .should('not.be.visible');

    cy.get('.full-name')
      .should('not.be.visible');

    cy.get('.all-auctions')
      .should('not.be.visible');

    cy.get('.info-prompt')
      .should('not.be.visible');

    cy.get('.contact-hidd-info')
      .should('have.text', 'Seller Profile is private.');

    cy.get('.bo-back-bttn').click();
    cy.location('pathname', { timeout: 500 }).should('eq', '/auction/3');
  })


  it('check full sellers information via link and go back to auction', () => {
    cy.location('pathname', { timeout: 500 }).should('eq', '/seller/1');

    cy.get('.contact-info')
      .should('be.visible');

    cy.get('.descrption')
      .should('be.visible');

    cy.get('.full-name')
      .should('be.visible');

    cy.get('.all-auctions')
      .should('be.visible');

    cy.get('.bo-back-bttn').click();
    cy.location('pathname', { timeout: 500 }).should('eq', '/');
  })

})
