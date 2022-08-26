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
      cy.get('[data-testid="button"]').eq(1)
  .should('be.visible')
  .click();

  })
  it('cards list',function(){
    cy.wait(3000)

    //Click Card icon
     cy.get('li.sc-brCFrO:nth-child(1) > div:nth-child(1) > span:nth-child(1) > svg').click()

     //Create New CARD
     cy.wait(3000)
     cy.get('button').contains('New Card').click()
     //CardHolder name
     cy.get('[id="fullName"]').type('TestCard')
     // Name On card
     cy.get('[id="nameOnCard"]').type('Cardname')
     //Mobile number
     cy.get('[id="mobile"]').type('8378780090')
     //Email
     cy.get('[id="email"]').type('email@yahoo.com')

     //Select business

     cy.get('#downshift-20-toggle-button').click()
     cy.get('#downshift-20-item-0').click()

     //Select cardProgram
     cy.get('#downshift-21-toggle-button').click()
     cy.get('#downshift-21-item-0').click()

     // Enter WALLET Initial amount

     cy.get('[class="sc-gicCDI iroSWH"]').eq(0).type('10')
     cy.get('[class="sc-gicCDI iroSWH"]').eq(1).type('10')

     // Address

     cy.get('[id="address.address1"]').type('123A,New Bus Stand')
     cy.get('[id="address.address2"]').type('Thanjavur')
     cy.get('[id="address.pincode"]').type('614804')
     cy.get('[id="address.city"]').type('Chennai')
     cy.get('[id="address.state"]').type('Tamilnadu')
     cy.get('button').contains('Issue Card').click()
    cy.get('.LjYDp > div:nth-child(1) > svg').click()
    cy.reload()
    cy.get('[id="searchCards"]').type('7010425866{enter}')//Mobile number with valid details
    cy.get('[id="searchCards"]').clear()
    cy.get('[id="searchCards"]').type('7010425860{enter}')//Mobile number with valid details
    cy.get('#downshift-0-toggle-button > div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > svg').click()//drop=down
    cy.get('[class="sc-fctJkW hdTcNZ"]').eq(0).click()//card number drop-down
    cy.get('[id="searchCards"]').clear()
    cy.get('[id="searchCards"]').type('3202{enter}')//card number with valid details
    cy.get('[id="searchCards"]').clear()
    cy.get('[id="searchCards"]').type('3200{enter}')//card number with invalid details
    cy.get('#downshift-0-toggle-button > div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > svg').click()//drop=down
    cy.get('[class="sc-fctJkW hdTcNZ"]').eq(1).click()//name  drop-down
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
    cy.reload()
    cy.wait(3000)

    //Get Card Details
    cy.get('div.sc-yeoIj:nth-child(1) > div:nth-child(1) > div:nth-child(7) > button').click({force:true})

    //Load fund with JIT and PREPAID
    cy.get('button.dFzDzx:nth-child(1)').click()
    cy.get('[placeholder="Amount"]').eq(0).type('10')
    cy.get('[placeholder="Amount"]').eq(1).type('10')
    //Click load fund button with amount
    cy.get('.gSoJhY').click({force:true});
    cy.get('[class="sc-kDDrLX hxMGbH"]').should('have.text','✓  Money loaded')
    cy.get('[class="sc-bZkfAO fIdmrO"]').should('have.text','Org balance is insufficient for loading money to card')
    cy.get('button.LjYDp:nth-child(4) > div:nth-child(1) > svg').click()

    //Load fund with no amount
    cy.get('button.dFzDzx:nth-child(1)').click({force:true})
    
    //Click load fund button without amount
    cy.get('.gSoJhY').click({force:true});

    // Withdraw with success and failure

    cy.get('button').contains('Withdraw').click();
    cy.get('[class="sc-gicCDI evAvNN"]').eq(0).type('10') 
    cy.get('[class="sc-gicCDI evAvNN"]').eq(1).type('10')
    cy.get('button').contains('Withdraw Funds').click();
    cy.get('.hxMGbH').should('have.text', '✓ Withdraw Success')//SUccess assertion
    cy.get('[class="sc-bZkfAO fIdmrO"]').should('have.text','✕ App Balance is lower than given amount')
    //cy.get('.fIdmrO').should('have.text', '✕ Card withdrawal not possible in issuer: YES')//failure assertion
    cy.get('button.LjYDp:nth-child(4) > div:nth-child(1) > svg').click()//close the screen

    // Withdraw without amount

    cy.get('button').contains('Withdraw').click();
    cy.get('button').contains('Withdraw Funds').click();
    cy.get('button.LjYDp:nth-child(4) > div:nth-child(1) > svg').click()//close the screen
    
    //Freeze Card

    cy.get('button').contains('Freeze Card').click()

    //Cancel the freeze dialog box

    cy.get('button').contains('Cancel').click()

    // Now freeze the card
    cy.get('button').contains('Freeze Card').click()
    cy.get('button').contains('Yes, Freeze Card').click()
    

    // Unfreeze card

    cy.get('button').contains('Unfreeze Card').click()

    //Cancel the Unfreeze dialog box

    cy.get('button').contains('Cancel').click()

    // Now freeze the card
    cy.get('button').contains('Unfreeze Card').click()
    cy.get('button').contains('Yes, Unfreeze Card').click()
    


  })
})