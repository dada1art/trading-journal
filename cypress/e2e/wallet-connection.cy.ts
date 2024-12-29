describe('Wallet Connection', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows connect wallet button when not connected', () => {
    cy.contains('Select Wallet').should('be.visible');
  });

  it('shows wallet address after connection', () => {
    // Note: This test requires wallet mock implementation
    cy.contains('Select Wallet').click();
    cy.contains('Phantom').click();
    cy.contains('1111...1111').should('be.visible');
  });
});