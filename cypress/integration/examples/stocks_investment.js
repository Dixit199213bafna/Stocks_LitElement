context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/')
  })

  it('Click on stock 4 to see the details', () => {
    cy.get('assesment-dixit')
      .shadow()
      .find('app-investments').shadow()
      .find('td').eq(8).click()
  });

  it('Click on stock 7 to see the details', () => {
    cy.get('assesment-dixit')
      .shadow()
      .find('app-investments').shadow()
      .find('td').eq(14).click()
  });
})
