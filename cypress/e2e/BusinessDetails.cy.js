

describe('Business details', function(){ 
  it('should load correct url',function(){
      cy.visit('http://100.91.145.58:3000/login')
       })
  /*it('Should check correct url',function(){
      cy.url().should('include','login.in')  
       }) */
  it('Verify title of the page',function(){
      cy.get('h1').should('be.visible')
       })
  it('verify the user name text box',function(){
    cy.get('.sc-gXmSlM').should('have.text', 'Email or Mobile Number')
  })
  
  
  it('Verify if enter invalid username',function(){
      cy.get('#form-field-email-mobile').clear()
      .type('testuser123@mailinator')
      .should('have.value', 'testuser123@mailinator')
      cy.get('.sc-ikZpkk').should('have.text', 'Enter a valid email or mobile number')
}) 
  
  it('Verify if enter unverified email',function(){
    cy.get('#form-field-email-mobile').clear()
    cy.get('#form-field-email-mobile')
     .type('testuser-886a50@mailinator.com')
  .should('have.value', 'testuser-886a50@mailinator.com')
  cy.get('#form-field-password').type('1234')
  cy.wait(3000)
  cy.get('.etUmhU > div:nth-child(1)').click();
  cy.get('.sc-ikZpkk').should('have.text', 'Your email testuser-886a50@mailinator.com is unverified, please verify email and login')
  
}) 

it('verify if enter unregistered user',function(){
  cy.get('#form-field-email-mobile').clear()
  cy.get('#form-field-email-mobile')
  .type('8767689897')
  .should('have.value', '8767689897')
  cy.get('.sc-cCsOjp').should('have.text', 'Admin not found with mobile number')
})

it('Verify if enter valid username',function(){
    cy.get('#form-field-email-mobile').clear()
      cy.get('#form-field-email-mobile')
       .type('testuser-2ab3f7@mailinator.com')
       .should('be.visible')
       .should('be.enabled')
       .should('have.value', 'testuser-2ab3f7@mailinator.com')
})
it('Verify if enter valid Password',function(){
    cy.get('#form-field-password').clear()
    cy.get('#form-field-password')
       .type('Test@123')
       .should('be.visible')
       .should('be.enabled')
       .should('have.value', 'Test@123')
})
it('Verify the login button',function(){
  cy.get('[data-testid="button"]')
  .should('be.visible').eq(0)
  .click();
})
})
