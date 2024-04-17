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
    cy.get('a[href*="#home"]:last').should('have.text', 'Home')
    cy.get('a[href*="https://www.mtu.edu/computing/cclc/"]').should('have.text', 'Schedule')
    cy.get('a[href*="https://cslc.mtu.edu/"]').should('have.text', 'Our Website')
    cy.get('a[href*="#login"]').should('have.text', 'Coach Login')
    cy.get('a[href*="#queue"]').should('have.text', 'Queue')

    //Question Form display tests
    cy.get('h1').should('have.text','Welcome to the CCLC!')
    cy.get('label').should('have.text','Enter QuestionType of QuestionRelevant Course')
    
    cy.get('[id=questionText]').should('exist')

    cy.get('select:first').select('Programming').should('have.value', 'Programming')
    cy.get('select:first').select('Theory').should('have.value', 'Theory')

    cy.get('select:last').select('CS1111 (Introduction to Programming in C/C++)').should('have.value', 'CS1111')
    cy.get('select:last').select('CS1121 (Introduction to Programming I)').should('have.value', 'CS1121')
    cy.get('select:last').select('CS1122 (Introduction to Programming II)').should('have.value', 'CS1122')
    cy.get('select:last').select('CS1131 (Accelerated Introduction to Programming)').should('have.value', 'CS1131')
    cy.get('select:last').select('CS1142 (Programming at the HW/SW Interface)').should('have.value', 'CS1142')
    cy.get('select:last').select('CS2311 (Discrete Structures)').should('have.value', 'CS2311')
    cy.get('select:last').select('CS2321 (Data Structures)').should('have.value', 'CS2321')

    cy.get('button:last').should('have.text','Submit your question')
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
    cy.get('button:last').should('have.text','Login')
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
      cy.get('button:last').should('have.text','Logout').click()
      cy.get('h1').should('have.text','Coach Login')
    })  
  })
})

describe('queue page', () => {
  it('displays correctly', () => {
    //navigate to page
    cy.visit('http://localhost:3000/')
    cy.get('a[href*="#queue"]').click()

    //check if page rendered correctly
    cy.get('th').should('have.text','QuestionsTypeClass')
  })
})

describe('Full application flow', () => {
  beforeEach(() => {
    //Load page
    cy.visit('http://localhost:3000/')
  })
  it('Question Submission', () => {
    //input data into form
    cy.get('[id=questionText]').type('test question')
    cy.get('select:first').select('Programming')
    cy.get('select:last').select('CS1111 (Introduction to Programming in C/C++)')

    //submit form
    cy.get('button:last').click()

    //test alert
    cy.on('window:alert',(t)=>{
      //assertions
      expect(t).to.contains('Question submitted successfully!');
    })

    //login to tjkalkma@mtu.edu google account
    cy.loginByGoogleApi()
    
    //go to login page
    cy.get('a[href*="#login"]').click()
    cy.wait(100)

    cy.get('a[href*="#queue"]').click()

    //check for question and delete
    cy.get('tr:last').contains('test questionProgrammingCS1111 (Introduction to Programming in C/C++)').get('input:last').check()
    cy.get('button').contains('text','Delete').click()

    cy.reload()

    //check if it was deleted
    cy.get('tr:last').contains('test questionProgrammingCS1111 (Introduction to Programming in C/C++)').should('not.exist')

    
  })

})