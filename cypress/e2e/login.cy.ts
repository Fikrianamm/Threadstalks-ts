/**
 * - Login spec
 *   - should display login page correctly
 *   - stay on login page when email is wrong
 *   - stay on login page when password is wrong
 *   - stay on login page when email is empty
 *   - stay on login page when password is empty
 *   - should display homepage when username and password are correct
 */


describe('Login spec', ()=>{
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('shoud display login page correctly', ()=>{
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  })
  
  it('stay on login page when email is wrong', () => {
    cy.get('input[placeholder="Email"]').type('wrong@email.com');
    cy.get('input[placeholder="Password"]').type('password');
    cy.get('button').contains(/^Login$/).click();
    cy.url().should('eq', 'http://localhost:5173/login');
  })


  it('stay on login page when password is wrong', ()=>{
    cy.get('input[placeholder="Email"]').type('carmine@gmail.com');
    cy.get('input[placeholder="Password"]').type('wrongpassword');
    cy.get('button').contains(/^Login$/).click();
    cy.url().should('eq', 'http://localhost:5173/login');
  })

  it('stay on login page when email is empty', ()=>{
    cy.get('button').contains(/^Login$/).click();
    cy.url().should('eq', 'http://localhost:5173/login');
  })

  it('stay on login page when password is empty', ()=>{
    cy.get('input[placeholder="Email"]').type('carmine@gmail.com');
    cy.get('button').contains(/^Login$/).click();
    cy.url().should('eq', 'http://localhost:5173/login');
  })

  it('should display homepage when username and password are correct', ()=>{
    cy.get('input[placeholder="Email"]').type('carmine@gmail.com');
    cy.get('input[placeholder="Password"]').type('password');
    cy.get('button').contains(/^Login$/).click();
    cy.url().should('eq', 'http://localhost:5173/');
  })
})