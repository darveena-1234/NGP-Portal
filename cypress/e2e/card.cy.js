import {base_url} from '../fixtures/config'

describe('Business details', function(){ 
  it('Verify Card91 business portal URL is loaded successfully',function(){
      cy.visit(base_url+'/login')})
      it('Should Login',function(){
      cy.get('#form-field-email-mobile').clear()
      cy.get('#form-field-email-mobile')
       .type('testuser-692c07@mailinator.com')
      cy.get('#form-field-password')
      .type('Test@123')
      cy.get('[data-testid="button"]')
  .should('be.visible').eq(0)
  .click();

  })
  it('cards list',function(){
    cy.wait(3000)
     cy.get('[class="sc-fIavCj jxJNgw"]').eq(1).click()
   
    cy.get('[id="searchCards"]').type('7010425866{enter}')//Mobile number with valid details
    cy.get('[id="searchCards"]').clear()
    cy.get('[id="searchCards"]').type('7010425860{enter}')//Mobile number with valid details
    cy.get('.sc-himrzO > .sc-csvncw > :nth-child(1) > .sc-dFdIVH > [data-testid="button"] > .sc-papXJ > .sc-ftvSup > .sc-bczRLJ > svg').click()
    cy.get('[class="sc-grREDI iLndbt"]').eq(0).click()//card number drop-down
    cy.get('[id="searchCards"]').clear()
    cy.get('[id="searchCards"]').type('3202{enter}')//card number with valid details
    cy.get('[id="searchCards"]').clear()
    cy.get('[id="searchCards"]').type('3200{enter}')//card number with invalid details
    cy.get('.sc-himrzO > .sc-csvncw > :nth-child(1) > .sc-dFdIVH > [data-testid="button"] > .sc-papXJ > .sc-ftvSup > .sc-bczRLJ > svg').click()
    cy.get('[class="sc-grREDI iLndbt"]').eq(1).click()//name drop-down
    cy.get('[id="searchCards"]').clear()
    cy.get('[id="searchCards"]').type('darveenaa{enter}')//card number with invalid details
    cy.get('[id="searchCards"]').clear()
    cy.get('[id="searchCards"]').type('darveena{enter}')//card number with valid details

    cy.reload()
    //Search with cardholder name

    cy.get('[id="searchcardHolderName"]').type('darveena{enter}')//valid details
    cy.get('[id="searchcardHolderName"]').clear()
    cy.get('[id="searchcardHolderName"]').type('darveena{enter}')
    cy.get('[id="searchcardHolderName"]').clear()//invalid details
    
    // Search with cardholder mobile number

    cy.get('[id="searchcardHolderMobile"]').type('917010425866{enter}')//valid details
    cy.get('[id="searchcardHolderMobile"]').clear()
    cy.get('[id="searchcardHolderMobile"]').type('917010425800{enter}')
    cy.get('[id="searchcardHolderMobile"]').clear()//invalid details


    //Search with KYC Status

    cy.get('[id="searchkycStatus"]').type('completed{enter}')//valid details
    cy.get('[id="searchkycStatus"]').clear()
    cy.get('[id="searchkycStatus"]').type('failed{enter}')
    cy.get('[id="searchkycStatus"]').clear()//invalid details

    //Search with last 4 digit card number

    cy.get('[id="searchcardLast4digits"]').type('3202{enter}')//valid details
    cy.get('[id="searchcardLast4digits"]').clear()
    cy.get('[id="searchcardLast4digits"]').type('3200{enter}')//invalid details
    cy.get('[id="searchcardLast4digits"]').clear()


    //Search with card type

    cy.get('[id="searchcardType"]').type('Digital Only Card{enter}')//Valid details
    cy.get('[id="searchcardType"]').clear()
    cy.get('[id="searchcardType"]').type('Personalised Card{enter}')//Invalid details
    cy.get('[id="searchcardType"]').clear()

    //Search with  issuer program

    cy.get('[id="searchissuerProgram"]').type('YES Bank{enter}')//valid details
    cy.get('[id="searchissuerProgram"]').clear()
    cy.get('[id="searchissuerProgram"]').type('SBM Bank{enter')//invalid details
    cy.get('[id="searchissuerProgram"]').clear()
    


  })
})