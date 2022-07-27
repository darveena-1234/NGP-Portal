Cypress. on('uncaught:exception', (err, runnable) => { return false; });
import { login_password, login_username, url } from "../../config";
import LoginPage from '../Page-Objects/Pages/LoginPage'
describe('url launch',function(){
beforeEach(function(){
    
    cy.visit(url);

})
  it('Should login',function(){
    //cy.visit(url)
    cy.LoginPage.login('username,password')

  }) 
    
})