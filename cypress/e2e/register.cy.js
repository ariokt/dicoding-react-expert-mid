/**
 * - Register spec
 *   - should display register page correctly
 *   - should display alert when name is empty
 *   - should display alert when email is empty
 *   - should display alert when user input wrong email format
 *   - should display alert when password is empty
 *   - should display alert when password length lower than 6
 *   - should display login page when register success
 */

describe('Register spec', () => {
  it('should display register page correctly', () => {
    cy.visit('http://localhost:5173/register');

    // memverifikasi elemen yang harus ditampilkan
    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Register$/).should('be.visible');
  });

  it('should display alert when name is empty', () => {
    cy.visit('http://localhost:5173/register');

    // klik tombol register
    cy.get('button').contains(/^Register$/).click();

    // verifikasi window.alert menampilkan pesan response dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert when email is empty', () => {
    cy.visit('http://localhost:5173/register');

    // input name
    cy.get('input[placeholder="Name"]').type('Ario');

    // klik tombol register
    cy.get('button').contains(/^Register$/).click();

    // verifikasi window.alert menampilkan pesan response dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when user input wrong email format', () => {
    cy.visit('http://localhost:5173/register');

    // input name
    cy.get('input[placeholder="Name"]').type('Ario');

    // mengisi email
    cy.get('input[placeholder="Email"]').type('ario');

    // klik tombol register
    cy.get('button').contains(/^Register$/).click();

    // verifikasi window.alert menampilkan pesan response dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    });
  });

  it('should display alert when password length lower than 6', () => {
    cy.visit('http://localhost:5173/register');

    // input name
    cy.get('input[placeholder="Name"]').type('Ario');

    // mengisi email
    cy.get('input[placeholder="Email"]').type('ario@mail.com');

    // mengisi password
    cy.get('input[placeholder="Password"]').type('tes');

    // klik tombol register
    cy.get('button').contains(/^Register$/).click();

    // verifikasi window.alert menampilkan pesan response dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('password must be at least 6 characters long');
    });
  });

  it('should display login page when register success', () => {
    const randomEmail = `${Cypress._.random(0, 1e6)}@example.com`;
    cy.visit('http://localhost:5173/register');

    // input name
    cy.get('input[placeholder="Name"]').type('Ario');

    // mengisi email
    cy.get('input[placeholder="Email"]').type(randomEmail);

    // mengisi password
    cy.get('input[placeholder="Password"]').type('arioario');

    // klik tombol register
    cy.get('button').contains(/^Register$/).click();

    // verifikasi elemen pada halaman login tampil
    cy.get('button').contains(/^Login$/).should('be.visible');
  });
});
