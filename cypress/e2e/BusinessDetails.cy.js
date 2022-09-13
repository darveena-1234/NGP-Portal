//import { contains } from 'cypress/types/jquery'
import {base_url} from '../fixtures/config'

describe('Business details', function(){ 
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
//describe('Should fill all admin details', function(){ 


  // Add Admin
   it('Verify if click admin button',function(){
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

    cy.get('[id="mobile-number"]').type('6177006979') // Mobile number
    .should('be.visible')
    .should('be.enabled')
    .should('have.value', '6177006979')

    cy.get('[id="email-address"]').type('6177006979@mailinator.com') // Email Address
    .should('be.visible')
    .should('be.enabled')
    .should('have.value', '6177006979@mailinator.com')
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
      cy.get('[id="adminEmail"]').type('7115656070@mailinator.com')
      cy.get('[id="adminMobile"]').type('7115656070')
      cy.get('[id="gst"]').type('22ZQORE5667H1Z2')
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

    cy.get('button').contains('Admins').click()

     //API Admin WITH INPUT
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

      //Webhooks With input
      cy.get('button').contains('Webhooks').click()
      cy.get('button').contains('Create Webhook').click()
     
     
      //validate transaction
      cy.get('[id="webhook-url"]').type('https://webhook.site/e60ced54-f74e-40ea-9b32-85db383a91a0')
      cy.get('[id="validateTransaction"]').should('be.checked').should('have.value','VALIDATE_TXN')
      cy.get('button.dFzDzx:nth-child(2)').should('be.enabled').click()
      
      
      
      //Create transaction
     
      cy.get('button').contains('Create Webhook').click()
      cy.get('[id="webhook-url"]').type('https://webhook.site/e60ced54-f74e-40ea-9b32-85db383a91a0')
      cy.get('[id="createTransaction"]').should('not.be.visible') // Passes
      .check({ force: true }).should('be.checked').should('have.value','CREATE_TXN')     
      
      
      //cy.get('[id="createTransaction"]').should('not.be.checked').check().should('have.value','CREATE_TXN')
      cy.get('button.dFzDzx:nth-child(2)').should('be.enabled').click()
      
      
      //CARD EVENTS
      
      cy.get('button').contains('Create Webhook').click()
      cy.get('[id="webhook-url"]').type('https://webhook.site/e60ced54-f74e-40ea-9b32-85db383a91a0')
      cy.get('[id="cardEvents"]').should('not.be.visible') // Passes
      .check({ force: true }).should('be.checked').should('have.value','CARD_EVENTS')     
    
    
      // cy.get('[id="cardEvents"]').should('not.be.checked').check().should('have.value','CARD_EVENTS')
      cy.get('button.dFzDzx:nth-child(2)').should('be.enabled').click()
     
      
      //SINGLE SIGN ON
      
      cy.get('button').contains('Create Webhook').click()
      cy.get('[id="webhook-url"]').type('https://webhook.site/e60ced54-f74e-40ea-9b32-85db383a91a0')
      cy.get('[id="singleSignOn"]').should('not.be.visible') // Passes
      .check({ force: true }).should('be.checked').should('have.value','CUSTOMER_AUTH')
      
      
      //cy.get('[id="singleSignOn"]').should('not.be.checked').check().should('have.value','CUSTOMER_AUTH')
      cy.get('button.dFzDzx:nth-child(2)').should('be.enabled').click()

      //kyc-events
      cy.get('button').contains('Create Webhook').click()
      cy.get('[id="webhook-url"]').type('https://webhook.site/e60ced54-f74e-40ea-9b32-85db383a91a0')
      cy.get('[id="kycEvents"]').should('not.be.visible') // Passes
      .check({ force: true }).should('be.checked').should('have.value','KYC_EVENTS')
       cy.get('button.dFzDzx:nth-child(2)').should('be.enabled').click()

      //Webhook without input
      cy.get('button.dFzDzx:nth-child(2)').should('be.enabled').click()
      cy.get('[class="sc-bZkfAO fIdmrO"]').eq(10).should('have.text','Enter URL')
      
      //Check Cancel button
      cy.get(':nth-child(1) > .sc-bPyhqo > :nth-child(3) > [data-testid="button"] > .sc-papXJ > svg').click()
      cy.get('button').contains('Cancel').click()


      //Delete webhook
      cy.get(':nth-child(1) > .sc-bPyhqo > :nth-child(3) > [data-testid="button"] > .sc-papXJ > svg').click()
      cy.get('button').contains('Delete Webhook').click()

      //Test Webhook
      cy.get('div.sc-dWINGa:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1) > div:nth-child(1)').click()
      cy.get('button.etUmhU:nth-child(2) > div').eq(0).click()

      //Close webhook page
      cy.get('.pLfFc > div:nth-child(1) > svg:nth-child(1)').click()

        })
          
      })
    
  
    /*it('Click sub-business button',function(){
      cy.get('button').contains('Add Sub-business').click()
    })
    it('SHould Fill sub-business name',function(){
      cy.get('[id="businessName"]').type('Sub business')
      .should('be.visible')
      .should('be.enabled')
      .should('have.value', 'Sub business')
    })
    it('Should select business type',function(){
      cy.get('[class="sc-bczRLJ esGJdo"]').eq(1).click()
      cy.get('[class="sc-grREDI iLndbt"]').eq(1).should('have.text','LLP').click()
    })
    it('Should enter business description',function(){
      cy.get('[id="businessDescription"]').type('Create Sub Business')
    })
    it('Should enter primary contact name',function(){
      cy.get('[id="adminName"]').type('PrimaryContact')
    })
    it('Should enter primary contact email',function(){
      cy.get('[id="adminEmail"]').type('PrimaryContact@mailinator.com')
    })
    it('Should enter primary contact mobile number',function(){
      cy.get('[id="adminMobile"]').type('8787865656')
    })
    it('should enter GST Number',function(){
      cy.get('[id="gst"]').type('22AZSWE4545H1Z2')
    })
    it('Should select primary business',function(){
      cy.get('[class="sc-bZkfAO dmiPjz"]').click()
      cy.get('li[class="sc-kgUAyh kWqipL"]').click()
    })
    it('Should enter the address line 1',function(){
      cy.get('[id="addressline1"]').type('123C,New Bus Stand')
    })
    it('Should enter the address line 2',function(){
      cy.get('[id="addressline2"]').type('Peravurani')
    })
    it('Should enter the landmark',function(){
        cy.get('[id="landmark"]').type('BNNS Complex')
    })
    it('Should enter Pincode',function(){
      cy.get('[id="pincode"]').type('614804')
    })
    it('Should enter city name',function(){
      cy.get('[id="city"]').type('Chennai')
    })
    it('Should enter State name',function(){
      cy.get('[id="state"]').type('Tamilnadu')
    })
    it('Verify details were saved if click submit button',function(){
      cy.get('.bfmTRx > button:nth-child(2) > div').eq(1).click({force:true})
      cy.get('[class="sc-gKXOVf pLfFc sc-bUbCnL kHrXFF"]').click()
    })
})
describe('Verify if click submit button without include no details',function(){
  it('navigate to sub-business list',function(){
    cy.get('button').contains('Sub Business').click()
  })
  it('Click sub-business button',function(){
    cy.get('button').contains('Add Sub-business').click()
  })
  it('Verify details were saved if click submit button',function(){
    cy.get('.bfmTRx > button:nth-child(2) > div').eq(1).click({force:true})
    cy.get('[class="sc-ikZpkk ikoNXp"]').eq(0).should('have.text','Enter a valid Sub-business name')
    cy.get('[class="sc-ikZpkk ikoNXp"]').eq(1).should('have.text','Enter a Description in 10-500 characters')
    cy.get('[class="sc-ikZpkk ikoNXp"]').eq(2).should('have.text','Enter a valid Primary Contact Name')
    cy.get('[class="sc-ikZpkk ikoNXp"]').eq(3).should('have.text','Enter a valid Phone Number')
    cy.get('[class="sc-ikZpkk ikoNXp"]').eq(4).should('have.text','Select a Parent Business')
    cy.get('[class="sc-ikZpkk ikoNXp"]').eq(5).should('have.text','Enter a valid address between 3-46 characters')
    cy.get('[class="sc-ikZpkk ikoNXp"]').eq(6).should('have.text','Enter a valid PIN code')
    cy.get('[class="sc-ikZpkk ikoNXp"]').eq(7).should('have.text','Enter a City name')
    cy.get('[class="sc-ikZpkk ikoNXp"]').eq(8).should('have.text','Enter a State name')
    cy.get('button').contains('Cancel').click()

})
})
describe('API Key list',function(){
  it('Navigate to the API List',function(){
    cy.get('[class="sc-kDDrLX ivXAPz sc-fWIMVQ fOVFWG"]').eq(2).click()
  })
  it('Should Click create Key button',function(){
    cy.get('button').contains('Create Key').click()
  })
  it('Should fill key name',function(){
    cy.get('[id="keyName"]').type('SuperAdminKey')
  })
  it('Should select admin role',function(){
    cy.wait(3000)
    cy.get('[id="superAdminId"]').should('be.checked').should('have.value','SUPER_ADMIN')
    cy.get('[id="cardAdminId"]').should('not.be.checked').should('have.value','CARD_ADMIN')
    cy.get('[id="readOnlyId"]').should('not.be.checked').should('have.value','READ_ONLY_ADMIN')
    cy.get('button').contains('Generate Key').click()
    cy.get('[class="sc-gKXOVf pLfFc sc-bUbCnL kHrXFF"]').click()
    
   })
  })
  describe('Verify If click submit button without adding key details',function(){
    it('Navigate to the API List',function(){
      cy.get('[class="sc-kDDrLX ivXAPz sc-fWIMVQ fOVFWG"]').eq(2).click()
    })
    it('Should Click create Key button',function(){
      cy.get('button').contains('Create Key').click()
      cy.get('button').contains('Generate Key').click()
      cy.get('[class="sc-ikZpkk ikoNXp"]').should('have.text','Enter the name')
      cy.get('[class="sc-gKXOVf pLfFc sc-bUbCnL kHrXFF"]').click()
    })
  })
//}
//else{
  describe('WebHook list',function(){
    it('Navigate to the WebHook List',function(){
      cy.get('[class="sc-kDDrLX ivXAPz sc-fWIMVQ fOVFWG"]').eq(3).click()
    })
    it('Should click create webhook button',function(){
      cy.get('button').contains('Create Webhook').click()
    })
    it('Should include webhook url',function(){
      cy.get('[id="webhook-url"]').type('https://webhook.site/e60ced54-f74e-40ea-9b32-85db383a91a0')
    })
    it('SHould Create validate webhook type',function(){
      cy.get('[id="validateTransaction"]').should('be.checked').should('have.value','VALIDATE_TXN')
      cy.get('button.etUmhU:nth-child(2)').should('be.enabled').click()
    })
  })
//}*/
    
   
