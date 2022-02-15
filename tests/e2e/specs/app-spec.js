describe("GoodGhosting game process", () => {
    it('visits page', () => {
        cy.visit('/')
        cy.get('#connect').click()
        cy.acceptMetamaskAccess()
        cy.get('h2').contains('Please approve before joining the game!')
    })

    it('approves game', () => {
        cy.get('#approve').click()
        cy.confirmMetamaskPermissionToSpend()
        cy.get('h2').contains('You are approved. Please join the game!')
        cy.wait(30000);
    })

    it('joins game', () => {
        cy.get('#join').click()
        cy.confirmMetamaskPermissionToSpend()
        cy.get('h2').contains('You are a player!')
        cy.wait(30000)
    })

    it('withdraws from game', () => {
        cy.get('#withdraw').click()
        cy.confirmMetamaskPermissionToSpend()
        cy.get('h2').contains('Please approve before joining the game!')
    })
})