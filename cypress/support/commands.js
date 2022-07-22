// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const cypress = require("cypress");

cypress.commands.add('setResolution',size=>{
    if(cypress._.isArray(size)){
        cy.viewport(size[0],size[1])
    }else{
        cy.viewport(size)
    }
})
cypress.commands.add('login',(username,password)=>{
    cy.get('#form-field-email-mobile').clear()
    .type('testuser123@mailinator')
    cy.get('#form-field-password').type('Test@1234')
    cy.get('[data-testid="button"]').eq(0).click()

})