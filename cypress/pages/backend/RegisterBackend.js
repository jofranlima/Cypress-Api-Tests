require('dotenv').config();
import { routes } from "../../configs/routes.js";
import { CNPJ } from '../../support/cnpj.js';
const { email } = require('../../support/faker.js');
let emailAddress;
emailAddress = email();
const basicAuthorization = `Basic ${Cypress.env('INTEGRATION_TOKEN')}`;

class RegisterBackend{
  validRegister(){

    cy.request({
      method: 'POST',
      url: `${routes.env.qa_gateway}/customer/v2/register/integration`,
      headers: {
        'Context-Type': 'application/json',
        'Authorization': basicAuthorization,
      },
      body: {
        "document": CNPJ.generate(),
        "email": emailAddress,
      }
    }).then(response => {
      expect(response.status).to.eq(201);
      expect([1, 2, 3]).to.include(response.body.analysis.status);
    });
  }

  emailAlreadyExist(){
    cy.request({
      method: 'POST',
      url: `${routes.env.qa_gateway}/customer/v2/register/integration`,
      headers: {
        'Context-Type': 'application/json',
        'Authorization': basicAuthorization,
      },
      body: {
        "document": CNPJ.generate(),
        "email": `${emailAddress}`,
      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(409);
      expect(response.body.message).to.eq('email is already associated with origin Adiante');
    });
  }


invalidDocument(){
  cy.request({
    method: 'POST',
    url: `${routes.env.qa_gateway}/customer/v2/register/integration`,
    headers: {
      'Context-Type': 'application/json',
      'Authorization': basicAuthorization,
    },
    body: {
      "document": '123456',
      "email": emailAddress,
    },
    failOnStatusCode: false,
  }).then(response => {
    expect(response.status).to.eq(400);
    expect(response.body.message).to.eq('invalid document');
  });
}

emptyDocument(){
  cy.request({
    method: 'POST',
    url: `${routes.env.qa_gateway}/customer/v2/register/integration`,
    headers: {
      'Context-Type': 'application/json',
      'Authorization': basicAuthorization,
    },
    body: {
      "document": '',
      "email": emailAddress,
    },
    failOnStatusCode: false,
  }).then(response => {
    expect(response.status).to.eq(400);
    expect(response.body.message).to.eq('document is required');
  })
}

emptyEmail(){
  cy.request({
    method: 'POST',
    url: `${routes.env.qa_gateway}/customer/v2/register/integration`,
    headers: {
      'Context-Type': 'application/json',
      'Authorization': basicAuthorization, 
    },
    body: {
      "document": CNPJ.generate(),
      "email": "",
    },
    failOnStatusCode: false,
  }).then(response => {
    expect(response.status).to.eq(400);
    expect(response.body.message).to.eq('document is required');
  });
}
}
export default new RegisterBackend