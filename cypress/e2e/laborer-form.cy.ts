describe('Laborer Form E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174/')
    cy.get('td').should('have.length.above', 1)
  })

  describe('WHEN the user clicks the Create laborer button', () => {
    it('should open a form modal with empty fields', () => {
      cy.contains('button', '+ Create laborer').click()

      cy.get('input[placeholder="Enter first name"]').should('have.value', '')
      cy.get('input[placeholder="Enter last name"]').should('have.value', '')
      cy.get('input[placeholder="your.email@example.com"]').should('have.value', '')
      cy.get('input[type="date"]').should('have.value', '')
      cy.get('input[placeholder="https://example.com/image.jpg"]').should('have.value', '')
      cy.get('select').should('have.value', 'user')
    })

    it('should validate form fields and show error messages', () => {
      cy.contains('button', '+ Create laborer').click()
      cy.contains('button', 'Save').click()

      cy.get('.fieldError').contains('First name must be at least 2 characters').should('be.visible')
      cy.get('.fieldError').contains('Last name must be at least 2 characters').should('be.visible')
      cy.get('.fieldError').contains('Invalid email address').should('be.visible')
      cy.get('.fieldError').contains('Hire date is required').should('be.visible')
      cy.get('.fieldError').contains('Picture must be a valid URL').should('be.visible')
    })
  })

  describe('WHEN the user fills the form with valid data and submits', () => {
    it('should create a new laborer and add it to the table', () => {
      cy.contains('button', '+ Create laborer').click()

      cy.get('input[placeholder="Enter first name"]').type('Sarah')
      cy.get('input[placeholder="Enter last name"]').type('Johnson')
      cy.get('input[placeholder="your.email@example.com"]').type('sarah.johnson@example.com')
      cy.get('input[type="date"]').type('2024-01-15')
      cy.get('select').select('supervisor')
      cy.get('input[placeholder="https://example.com/image.jpg"]').type('https://example.com/sarah.jpg')

      cy.contains('button', 'Save').click()

      cy.contains('Sarah Johnson').should('be.visible')
      cy.get('td').contains('sarah.johnson@example.com').should('be.visible')
    })

    it('should cancel form creation without adding a laborer', () => {
      cy.get('table tr').then(($rows) => {
        const initialRowCount = $rows.length

        cy.contains('button', '+ Create laborer').click()
        cy.get('input[placeholder="Enter first name"]').type('Test User')
        cy.contains('button', 'Cancel').click()

        cy.get('table tr').should('have.length', initialRowCount)
      })
    })
  })
})