describe("Connect metamask wallet", () => {
    it('visits page', () => {
        cy.visit('/')
        cy.get('#connect').click()
        cy.acceptMetamaskAccess()
    })

    it('gets network', () => {
        cy.getNetwork().then(network => {
            expect(network.networkName).to.be.equal('kovan');
        })
    })
})