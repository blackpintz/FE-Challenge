describe("Connect metamask wallet", () => {
    it('visits page', () => {
        cy.visit('/')
        cy.get('#connect').click()
    })

    it('approves game', () => {
        cy.acceptMetamaskAccess()
        cy.get('#approve').click()
        cy.confirmMetamaskTransaction().then(confirmed => {
            expect(confirmed).to.be.true;
        })
        cy.getNetwork().then(network => {
            expect(network.networkName).to.be.equal('kovan');
        })
    })
})