/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('welcome page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('displays welcome page', () => {
    //Nav bar display tests
    cy.get('*[class^="navbar-brand"]').should('have.text','CCLC Queue')
    cy.get('a[href*="#home"]:last').should('have.text', 'Home')
    cy.get('a[href*="https://www.mtu.edu/computing/cclc/"]').should('have.text', 'Schedule')
    cy.get('a[href*="https://cslc.mtu.edu/"]').should('have.text', 'Our Website')
    cy.get('a[href*="#login"]').should('have.text', 'Coach Login')
    cy.get('a[href*="#queue"]').should('have.text', 'Queue')

    //Question Form display tests
    cy.get('h1').should('have.text','Welcome to the CCLC!')
    cy.get('label').should('have.text','Enter QuestionType of QuestionRelevant Course')
    
    cy.get('[id=questionText]').should('exist')

    cy.get('select:first').select('Programming').should('have.value', '1')
    cy.get('select:first').select('Theory').should('have.value', '2')

    cy.get('select:last').select('CS 1111 (Introduction to Programming in C/C++)').should('have.value', '1')
    cy.get('select:last').select('CS 1121 (Introduction to Programming I)').should('have.value', '2')
    cy.get('select:last').select('CS 1122 (Introduction to Programming II)').should('have.value', '3')
    cy.get('select:last').select('CS 1131 (Accelerated Introduction to Programming)').should('have.value', '4')
    cy.get('select:last').select('CS 1142 (Programming at the HW/SW Interface)').should('have.value', '5')
    cy.get('select:last').select('CS 2311 (Discrete Structures)').should('have.value', '6')
    cy.get('select:last').select('CS 2321 (Data Structures)').should('have.value', '7')

    cy.get('button').should('have.text','Submit your question')
  })
})

describe('coach login page', () => {
  it('displays correctly', () => {
    //navigate to page
    cy.visit('http://localhost:3000/')
    cy.get('a[href*="#login"]').click()

    //check if page rendered fully
    cy.get('form').should('exist')
    cy.get('h1').should('have.text','Coach Login')
  })

describe('login and logout functionality', () => {
  beforeEach(() => {
    //navigate to page
    cy.visit('http://localhost:3000/')

    //login to tjkalkma@mtu.edu google account
    cy.loginByGoogleApi()
    
    //go to login page
    cy.get('a[href*="#login"]').click()
    cy.wait(100)
  })

  it('login test', () => {
    //check if logged in
    cy.get('h1').should('have.text','Coach Logged In')
    cy.get('img').should('exist')
    cy.get('p').should('have.text','Name: Tyler KalkmanEmail Address: tjkalkma@mtu.edu')
  })
  it('logout test', () => {
    cy.get('button').should('have.text','Logout')
    cy.get('button').click()
    cy.get('h1').should('have.text','Coach Login')
  })

  
})
})

