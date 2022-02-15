describe("GoodGhosting game process", () => {
    it('visits page', () => {
        cy.visit('/')
        cy.get('#connect').click()
        cy.acceptMetamaskAccess()
    })

    it('approves game', () => {
        cy.get('#approve').click()
        cy.confirmMetamaskPermissionToSpend()
        cy.wait(30000);
    })

    it('joins game', () => {
        cy.get('#join').click()
        cy.confirmMetamaskPermissionToSpend()
        cy.wait(30000)
    })

    it('withdraws from game', () => {
        cy.get('#withdraw').click()
        cy.confirmMetamaskPermissionToSpend()
    })
})