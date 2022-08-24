export default class BasePage{
    static pause(ms){
        cy.wait(ms)
    }
    static logInfo(message)
    {
        cy.log(message)
    }
    static setLargeDesktopWiewport(){
        cy.viewport(1980,1080)
    }
}