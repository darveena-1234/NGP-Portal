//import { contains } from 'cypress/types/jquery'
import { eq } from 'lodash'
import {base_url} from '../fixtures/config'

describe('NGP Portal', function(){ 
  it('Verify Card91 business portal URL is loaded successfully',function(){
      cy.visit(base_url+'/login')})
  /*it('Should check correct url',function(){
      cy.url().should('include','login.in')  
       }) */
  it('Verify title of the page',function(){
      cy.get('h1').should('be.visible')
       })
  it('verify the user name text box',function(){
    cy.get('[name="username"] > .sc-jIZahH > .sc-iIPllB').should('have.text', 'Enter Email address or Mobile number')
  })
  it('Verify if enter invalid username',function(){
      //cy.exec('npm run db:reset && npm run db:seed')// reset and seed the database prior to every test
      cy.get('#form-field-email-mobile').clear()
      .type('testuser123@mailinator')
      .should('have.value', 'testuser123@mailinator')
      cy.get('.sc-bZkfAO').should('have.text', 'Enter a valid email or mobile number')
}) 
  
  it('Verify if enter unverified email',function(){
   // cy.exec('npm run db:reset && npm run db:seed')// reset and seed the database prior to every test
  cy.get('#form-field-email-mobile').clear()
  cy.get('#form-field-email-mobile')
     .type('testuser-886a50@mailinator.com')
     .should('have.value', 'testuser-886a50@mailinator.com')
  cy.get('#form-field-password').type('1234')
  cy.wait(3000)
  cy.get('.dFzDzx > .sc-papXJ').click()
  cy.get('[class="sc-bZkfAO fIdmrO"]').should('have.text', 'Your email testuser-886a50@mailinator.com is unverified, please verify email and login')
  
}) 


it('verify if enter unregistered mobile number',function(){
  cy.get('#form-field-email-mobile').clear()
  cy.get('#form-field-email-mobile')
  .type('8767689897')
  .should('have.value', '8767689897')
  cy.get('.sc-bZkfAO').should('have.text', 'Admin not found with mobile number')
})
it('verify if OTP not entered',function(){
  cy.get('#form-field-email-mobile').clear()
  cy.get('#form-field-email-mobile')
  .type('7003893039')
  cy.get('.dFzDzx > div:nth-child(1)').click()
  cy.get('p.sc-kDDrLX:nth-child(3)').should('have.text', 'Please enter OTP')
})

it('verify if enter incorrect OTP',function(){
  cy.get('#form-field-email-mobile').clear()
  cy.get('#form-field-email-mobile')
  .type('6281288256')
  .should('have.value', '6281288256')
  let a="OTP retries"
  if (a=="OTP retries"){
    cy.get('.sc-bZkfAO').should('contains.text', 'Retry attempts exceeded. Please try after some time')
  }else{
    cy.wait(1000)
  cy.get('[aria-label="OTP Input 1"]').type('1')
  cy.get('[aria-label="OTP Input 2"]').type('1')
  cy.get('[aria-label="OTP Input 3"]').type('1')
  cy.get('[aria-label="OTP Input 4"]').type('1')
  cy.get('[aria-label="OTP Input 5"]').type('1')
  cy.get('[aria-label="OTP Input 6"]').type('1')
 cy.get('button').contains('Verify OTP').click()
  cy.wait(1000)
  cy.get('p.sc-kDDrLX:nth-child(3)').should('have.text', 'Incorrect OTP for the mobile num 916281288256 in verifying login otp')}
})
it('verify if user enter invalid password more than three time',function(){
  cy.get('#form-field-email-mobile').clear()
  cy.get('#form-field-email-mobile').type('testuser-2ab3f7@mailinator.com')
  cy.get('#form-field-password').clear()
  cy.get('#form-field-password').type('Test@1234')
  cy.get('.dFzDzx > .sc-papXJ').click()
  cy.get('.fIdmrO').should('contains.text','Admin is locked, please do reset password to unlock it')
})
it('verify if enter valid email and invalid password',function(){
  cy.get('#form-field-email-mobile').clear()
  cy.get('#form-field-email-mobile').type('Primeuser-820bf@mailinator.com')
  cy.get('#form-field-password').clear()
  cy.get('#form-field-password').type('Test@1234')
  cy.get('.dFzDzx > .sc-papXJ').click()
  cy.get('[class="sc-bZkfAO fIdmrO"]').eq(0).should('contains.text','Invalid Email or Password')
})
it('clear cookies',function(){
  cy.clearCookies()
})
it('clear local storage',function(){
  cy.clearLocalStorage()
})
it('Reload',function(){
  cy.reload()
})
it('Verify if enter valid username',function(){
  cy.wait(5000)
    cy.get('#form-field-email-mobile').clear()
      cy.get('#form-field-email-mobile')
       .type('Primeuser-002ddc@mailinator.com')
       .should('be.visible')
       .should('be.enabled')
       .should('have.value', 'Primeuser-002ddc@mailinator.com')
       .should('have.length', 1);
})
it('Verify if enter valid Password',function(){
    cy.get('#form-field-password').clear()
    cy.get('#form-field-password')
       .type('Test@123')
       .should('be.visible')
       .should('be.enabled')
       .should('have.value', 'Test@123')
       .should('have.length', 1);
})
it('Verify the login button',function(){
  cy.get('.dFzDzx > .sc-papXJ')
  .should('be.visible')
  .click();
})
})

/*it('Navigate through the links using loops', () => {
  cy.wait(5000);
  const pages = ['business', 'cards', 'accounts', 'cardprogram']
  
  cy.visit(base_url+'/')
 
  pages.forEach(href => {
 
    cy.contains(href).click()
    cy.location('pathname').should('eq', `/${href}`)
    cy.go('back')
 
  })
 
})

it('Test 5 - Checking all the links on the homepage are working', () => {
  

  //Visits the homepage and checks all the valid links one by one using API call and gets their status code as 200 which means success

  cy.get('a')
  .each(($a) => {
      console.log('$a', $a);
      const href = $a.prop('href');
      console.log('href', href)
      if(href==="" || href.includes('/cards') || href.includes('javascript')){ //skipping all the invalid links with null
          return;
      }
      cy.request(encodeURI(href), function (error, response, body) {
          return response.statusCode.then(function (code) {
              if(code == 404){
                  throw new Error('whoops! broken link', href);
              }
              expect(code).to.eq(200);
          })
      })
  })
  cy.resetDb;
})*/
// Admin with input
describe('Should fill all details', function(){ 


  // Add Admin
   it('Admin Tets cases',function(){
   cy.wait(3000)
    cy.get('button').contains('Invite Admin').click({force:true})
    //cy.wait(3000)
    cy.get('[id="full-name"]').type('AdminName') // Admin Name
    .should('be.visible')
    .should('be.enabled')
    .should('have.value', 'AdminName')
    
    cy.get('[id="calling-name"]').type('callingname') // Calling name
    .should('be.visible')
    .should('be.enabled')
    .should('have.value', 'callingname')

    cy.get('[id="mobile-number"]').type('9363887878') // Mobile number
    .should('be.visible')
    .should('be.enabled')
    .should('have.value', '9363887878')

    cy.get('[id="email-address"]').type('9363887878@mailinator.com') // Email Address
    .should('be.visible')
    .should('be.enabled')
    .should('have.value', '9363887878@mailinator.com')
    cy.wait(3000)

    cy.get('[id="superAdminId"]').should('be.checked') // Super Admin Check Box
    .should('have.value','SUPER_ADMIN')

    cy.get('[id="cardAdminId"]').should('not.be.checked') // Card Admin Check Box
    .should('have.value','CARD_ADMIN')

    cy.get('[id="readOnlyId"]').should('not.be.checked') // RO Admin Check Box
    .should('have.value','READ_ONLY_ADMIN')

    cy.get('[id="developerAdminId"]').should('not.be.checked')  // Dev Admin Check Box
    .should('have.value','DEVELOPER_ADMIN')
    

    cy.get('button.sc-gKXOVf.gSoJhY')
    .should('have.text','Invite Admin').click({force:true}) // Submit button
    cy.wait(2000)
    // Admin without input
    cy.get('button').contains('Invite Admin').click()
    cy.get('button.sc-gKXOVf.gSoJhY')
    .should('have.text','Invite Admin').click({force:true}) 

    cy.get('#inviteAdminForm > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)').should('have.text','Enter full name')
    cy.get('#inviteAdminForm > div:nth-child(2) > div:nth-child(2) > p').should('have.text','Enter calling name')
    cy.get('#inviteAdminForm > div:nth-child(3) > div:nth-child(2) > p').should('have.text','Enter the mobile number')
    cy.wait(2000)

    cy.get('button').contains('Cancel').click() //  Cancel button
    cy.wait(3000)

    // Sub business with input
    cy.get('button').contains('Sub Business').click() // Sub business button

      cy.get('button').contains('Add Sub-business').eq(0).click() // Add sub- business button
      cy.get('[id="businessName"]').type('Sub business')
      .should('be.visible')
      .should('be.enabled')
      .should('have.value', 'Sub business')
      cy.get('[id="displayName"]').type('Display name')
      .should('be.visible')
      .should('be.enabled')
      .should('have.value', 'Display name')
      cy.get('#downshift-20-toggle-button > div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > svg').click()
      cy.get('[class="sc-fctJkW hdTcNZ"]').eq(1)
      .should('have.text','LLP').click()
      cy.get('[id="businessDescription"]').type('Create Sub Business')
      cy.get('[id="adminName"]').type('PrimaryContact')
      cy.get('[id="adminEmail"]').type('6011565787@mailinator.com')
      cy.get('[id="adminMobile"]').type('6011565787')
      cy.get('[id="gst"]').type('22VCDFH6077H1Z2')
      cy.wait(3000)
      cy.get('[class="sc-gicCDI kfezDX"]').click()
      cy.get('li[class="sc-cOFTSb dRVokV"]').eq(0).click()
      cy.get('[id="addressline1"]').type('123C,New Bus Stand')
      cy.get('[id="addressline2"]').type('Peravurani')
      cy.get('[id="landmark"]').type('BNNS Complex')
      cy.get('[id="pincode"]').type('614804')
      cy.get('[id="city"]').type('Chennai')
      cy.get('[id="state"]').type('Tamilnadu')
      cy.get('.bfmTRx > button:nth-child(2) > div:nth-child(1)').click()//Add sub business button with input

    // Sub-business without input
    
    cy.get('button').contains('Add Sub-business').click()
    cy.get('.bfmTRx > button:nth-child(2) > div:nth-child(1)').click()//Add sub business button without input
    cy.get('[class="sc-bZkfAO fIdmrO"]').eq(0).should('have.text','Enter a valid Sub-business name')
    cy.get('[class="sc-bZkfAO fIdmrO"]').eq(1).should('have.text','Enter a valid display name')
    
    cy.get('[class="sc-bZkfAO fIdmrO"]').eq(2).should('have.text','Enter a Description in 10-500 characters')
    
    cy.get('[class="sc-bZkfAO fIdmrO"]').eq(3).should('have.text','Enter a valid Primary Contact Name')
    
    cy.get('[class="sc-bZkfAO fIdmrO"]').eq(4).should('have.text','Enter a valid Phone Number')
   
    cy.get('[class="sc-bZkfAO ASsNB"]').should('have.text','Select a Parent Business')
    
    cy.get('[class="sc-bZkfAO fIdmrO"]').eq(5).should('have.text','Enter a valid address between 3-46 characters')
    
    cy.get('[class="sc-bZkfAO fIdmrO"]').eq(6).should('have.text','Enter a valid PIN code')

    cy.get('[class="sc-bZkfAO fIdmrO"]').eq(7).should('have.text','Enter a City name')

    cy.get('[class="sc-bZkfAO fIdmrO"]').eq(8).should('have.text','Enter a State name')
    cy.get('button').contains('Cancel').click()
    cy.wait(3000)

    // Allocate Money
    cy.wait(3000)
    cy.get('button').contains('Sub Business').click() 
    cy.get('button').contains('Allocate Money').click()
    cy.wait(2000)
    cy.get('[class="sc-gicCDI kfezDX"]').click()
    cy.get('[class="sc-gicCDI kfezDX"]').type('sub')
    cy.get('[role="option"]').eq(0).click()
    cy.get('button').contains('Remove').click()
    cy.get('[placeholder="Enter amount"]').type('10')
    cy.get('.gSoJhY').click()

    //Get Sub-business details
    cy.get('[class="sc-papXJ dcCGwG"]').eq(10).click()
    //Add money to sub-business
    cy.get('.LjYDp > div:nth-child(1) > svg').click()
    //Search sub-business
    cy.get('[id="searchBusiness"]').click()
    cy.get('[id="searchBusiness"]').type('abcde')
    

    //API Admin WITH INPUT 
    cy.get('button').contains('Admins').click()
    cy.get('button').contains('API Keys').click()
    cy.get('button').contains('Create Key').click()
    cy.get('[id="keyName"]').type('SuperAdminKey')
    cy.wait(3000)
    cy.get('[id="superAdminId"]')
    .should('be.checked').should('have.value','SUPER_ADMIN')
    cy.get('[id="cardAdminId"]')
      .should('not.be.checked').should('have.value','CARD_ADMIN')
      cy.get('[id="readOnlyId"]')
      .should('not.be.checked').should('have.value','READ_ONLY_ADMIN')
      cy.get('button').contains('Generate Key').click()
      cy.wait(3000)
      cy.get('.LjYDp').click()
 
      
      //API Admin WITHOUT INPUT
      cy.get('button').contains('API Keys').click()
      cy.get('button').contains('Create Key').click()
      cy.get('button').contains('Generate Key').click()
      cy.get('[class="sc-himrzO dwgKBd"]').should('have.text','Enter the name')
      cy.get('.LjYDp').click()
      cy.wait(3000)

      //Delete Api admin--//Cancel button
      cy.get('button').contains('Delete').click()
      cy.get('button').contains('Cancel').click()

      //Cancel
      cy.get('button').contains('Delete').click()
      cy.get('[class="sc-gKXOVf ibLGgv"]').click()
      

      //Webhooks With input
      cy.get('button').contains('Webhooks').click()
      cy.get('button').contains('Create Webhook').click()
     
     
      //validate transaction
      cy.get('[id="webhook-url"]').type('https://webhook.site/77dfdba2-df27-4b82-9029-b54255f8c488')
      cy.get('[id="validateTransaction"]').should('be.checked').should('have.value','VALIDATE_TXN')
      cy.get('button.dFzDzx:nth-child(2)').should('be.enabled').click()
      
      
      
      //Create transaction
     
      cy.get('button').contains('Create Webhook').click()
      cy.get('[id="webhook-url"]').type('https://webhook.site/77dfdba2-df27-4b82-9029-b54255f8c488')
      cy.get('[id="createTransaction"]').should('not.be.visible') // Passes
      .check({ force: true }).should('be.checked').should('have.value','CREATE_TXN')     
      
      
      //cy.get('[id="createTransaction"]').should('not.be.checked').check().should('have.value','CREATE_TXN')
      cy.get('button.dFzDzx:nth-child(2)').should('be.enabled').click()
      
      
      //CARD EVENTS
      
      cy.get('button').contains('Create Webhook').click()
      cy.get('[id="webhook-url"]').type('https://webhook.site/77dfdba2-df27-4b82-9029-b54255f8c488')
      cy.get('[id="cardEvents"]').should('not.be.visible') // Passes
      .check({ force: true }).should('be.checked').should('have.value','CARD_EVENTS')     
    
    
      // cy.get('[id="cardEvents"]').should('not.be.checked').check().should('have.value','CARD_EVENTS')
      cy.get('button.dFzDzx:nth-child(2)').should('be.enabled').click()
     
      
      //SINGLE SIGN ON
      
      cy.get('button').contains('Create Webhook').click()
      cy.get('[id="webhook-url"]').type('https://webhook.site/77dfdba2-df27-4b82-9029-b54255f8c488')
      cy.get('[id="singleSignOn"]').should('not.be.visible') // Passes
      .check({ force: true }).should('be.checked').should('have.value','CUSTOMER_AUTH')
      
      
      //cy.get('[id="singleSignOn"]').should('not.be.checked').check().should('have.value','CUSTOMER_AUTH')
      cy.get('button.dFzDzx:nth-child(2)').should('be.enabled').click()

      //kyc-events
      cy.get('button').contains('Create Webhook').click()
      cy.get('[id="webhook-url"]').type('https://webhook.site/77dfdba2-df27-4b82-9029-b54255f8c488')
      cy.get('[id="kycEvents"]').should('not.be.visible') // Passes
      .check({ force: true }).should('be.checked').should('have.value','KYC_EVENTS')
       cy.get('button.dFzDzx:nth-child(2)').should('be.enabled').click()

      //Webhook without input
      cy.get('button').contains('Create Webhook').click()
      cy.get('button.dFzDzx:nth-child(2)').should('be.enabled').click()
      cy.wait(3000)
      cy.get('.sc-bZkfAO').should('be.visible').should('have.text','Enter URL')
      
      
      //Check Cancel button
      //cy.get('.kzcTGx > div').click({force:true})
      cy.get('button').contains('Cancel').click()
      cy.wait(3000)


      //Delete Icon webhook
      cy.get('[class="sc-gKXOVf bgdjeH"]').eq(1).click()
      //Cancel Webhook
      cy.get('button').contains('Cancel').click()
      //Delete webhook
      cy.get('[class="sc-gKXOVf bgdjeH"]').eq(1).click()
      cy.get('button').contains('Delete Webhook').click()

      //Test Webhook Test Webhook
      cy.get('button').contains('Test Webhook').eq(0).click()
      cy.wait(3000)
      cy.get('[class="sc-jqUVSM fFzWLA"]').eq(22).click({force:true})
      cy.get('[class="sc-c1597a2b-0 jfBmXe"]').should('have.text','{"webhookStatusCode":200,"webhookResponseMessage":"OK"}')

      //Close webhook page
      cy.get('[class="sc-gKXOVf LjYDp sc-hlnMnd fFJgHU"]').click()
     

      //Edit Webhook   //Cancel edit
      cy.get('[class="sc-gKXOVf iFGgOF showOnHover"]').eq(2).click()
      cy.get('[class="sc-gKXOVf fovrAL"]').click({force:true})

      //Submit edit
      cy.get('[class="sc-gKXOVf iFGgOF showOnHover"]').eq(2).click()
      cy.get('[type="submit"]').click()

      //Add Money
      cy.get('[class="sc-bczRLJ dQKGQd"]').eq(0).click({force:true});
      cy.get('button').contains('Add Money').click()
      cy.get('[id="amount"]').eq(0).type('100')
      cy.get('[id="utrNumber"]').type('XXXXR520190109599036XX')
      cy.get('[class="sc-bczRLJ esGJdo"]').eq(2).click()
      cy.get('button').contains('19').click()
      cy.wait(2000)
      cy.get('.gSoJhY > div').eq(0).click()
      cy.get('.behARt').should('be.visible').should('have.text','Your request is received, need to be approved by finance admin')

      //Cards
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