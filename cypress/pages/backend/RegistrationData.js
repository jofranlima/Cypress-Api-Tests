require('dotenv').config();
import { routes } from "../../configs/routes.js";
import userData from '../../fixtures/user.json';
const { DOCUMENT } = userData.USERS;

const basicAuthorization = `Basic ${Cypress.env('INTEGRATION_TOKEN')}`;
const { accountNumber, agencyNumber } = require('../../support/faker.js');

let sessionToken;

class RegistrationData{
  createSession(){
    cy.request({
      method: 'POST',
      url: `${routes.env.dev_gateway}/authentication/v2/customer/login/integration`,
      headers: {
        'Context-Type': 'application/json',
        'Authorization': basicAuthorization,
        'customer_ip': '182.168.0.1',
        'user_type': 'customer'
      },
      body: {
        "document": DOCUMENT,
      },
      failOnStatusCode: false,
    }).then(response => {
      const sessionToken = response.body.token;
      window.localStorage.setItem('sessionToken', sessionToken);
    });
  }
  adicionarBanco() {

    cy.request({
      method: 'POST',
      url: `${routes.env.dev_gateway}/customer/v2/banks`,
      headers: {
        'Context-Type': 'application/json',
        'customer_ip': '192.168.0.1',
        'user_type': 'customer',
        'Authorization': `Bearer ${sessionToken}`,
      },
      body: {
        "agency": agencyNumber(),
        "account": accountNumber(),
        "digit": "2",
        "bankCode": "341",
        "accountType": "savings"
      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("bank successfully created!")

    });
  }
  adionarTelefone(){

    cy.request({
      method: 'POST',
      url: `${routes.env.dev_gateway}/customer/v2/phones`,
      headers: {
        'Context-Type': 'application/json',
        'customer_ip': '192.168.0.1',
        'user_type': 'customer',
        'Authorization': `Bearer ${sessionToken}`,
      },
      body: {
        "countryCode": "55",
        "dddCode": "11",
        "number": "989999999999",
        "phoneType": "commercial"

      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("phone created successfully")

    });
  }
  adicionarEndereço(){

    cy.request({
      method: 'POST',
      url: `${routes.env.dev_gateway}/customer/v2/adresses`,
      headers: {
        'Context-Type': 'application/json',
        'customer_ip': '192.168.0.1',
        'user_type': 'customer',
        'Authorization': `Bearer ${sessionToken}`,
      },
      body: {
        "cep": "04244000",
        "street": "Rua dos testes",
        "number": "12345",
        "neighborhood": "Bairro Automação",
        "addressType": "residential",
        "complement": "complemento"

      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("address successfully registered")

    });
  }
}
  export default new RegistrationData
