class AutomationDemoPage {

    visit() {
        cy.visit("https://dawn.sb.stag.card91.in")
    }
}
export default new AutomationDemoPage()