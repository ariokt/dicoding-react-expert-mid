/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when user input wrong email format
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/login');

    // memverifikasi elemen yang harus ditampilkan
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.visit('http://localhost:5173/login');

    // klik tombol login
    cy.get('button').contains(/^Login$/).click();

    // verifikasi window.alert menampilkan pesan response dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"id" is not allowed to be empty');
    });
  });

  it('should display alert when user input wrong email format', () => {
    cy.visit('http://localhost:5173/login');

    // mengisi email
    cy.get('input[placeholder="Email"]').type('ario');

    // klik tombol login
    cy.get('button').contains(/^Login$/).click();

    // verifikasi window.alert menampilkan pesan response dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    });
  });

  it('should display alert when password is empty', () => {
    cy.visit('http://localhost:5173/login');

    // mengisi email
    cy.get('input[placeholder="Email"]').type('ari@mail.com');

    // klik tombol login
    cy.get('button').contains(/^Login$/).click();

    // verifikasi window.alert menampilkan pesan response dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.visit('http://localhost:5173/login');

    // mengisi email
    cy.get('input[placeholder="Email"]').type('testing@mail.com');

    // mengisi password
    cy.get('input[placeholder="Password"]').type('wrong_password');

    // klik tombol login
    cy.get('button').contains(/^Login$/).click();

    // verifikasi window.alert menampilkan pesan response dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    cy.visit('http://localhost:5173/login');

    // mengisi email
    cy.get('input[placeholder="Email"]').type('ari@mail.com');

    // mengisi password
    cy.get('input[placeholder="Password"]').type('ariari');

    // klik tombol login
    cy.get('button').contains(/^Login$/).click();

    // verifikasi elemen pada homepage tampil
    cy.get('div').contains(/^DICODING FORUM APP$/).should('be.visible');
    cy.get('a[href="/add-thread"]').should('be.visible');
  });
});
