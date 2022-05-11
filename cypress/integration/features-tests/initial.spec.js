/// <reference types="cypress" />


describe('check-buttons', () => {
  beforeEach(() => {
        cy.visit('http://localhost:3000/')
  })
  
  it('check login button enabled', () => {
    cy.get('header').should('be.visible')
    cy.get('#sign-button').should('be.enabled')
  })

  it('check subscribe button enable', () => {
    cy.get('#subscribe-button').should('be.enabled')
  })
})