class AutomationDemoPage {

    visit() {
        cy.visit("https://dawn.sb.stag.card91.in")
    }
    Email(){
        cy.get('#form-field-email-mobile')
       .type('Primeuser-002ddc@mailinator.com')
       .should('be.visible')
       .should('be.enabled')
       .should('have.value', 'Primeuser-002ddc@mailinator.com')
       .should('have.length', 1)

    }
    Password(){
        cy.get('#form-field-password')
       .type('Test@123')
       .should('be.visible')
       .should('be.enabled')
       .should('have.value', 'Test@123')
       .should('have.length', 1)

    }
    Login() {
        cy.get('.dFzDzx > .sc-papXJ').should('be.visible').click();
    }
}
export default new AutomationDemoPage()