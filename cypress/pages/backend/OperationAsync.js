require('dotenv').config();
import { routes } from "../../configs/routes.js";

const installmentId = window.localStorage.getItem('installmentId');
const numericInstallmentId = Number(installmentId);
const sessionToken = window.localStorage.getItem('sessionToken')


class OperationAsync {
  operation() {
    cy.request({
      'method': 'POST',
      'url': `${routes.env.dev_gateway}/customer/v4/invoice/operation`,
      'headers': {
        'user_type': 'customer',
        'customer_ip': 'localhost',
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json'
      },
      body: {
        "installmentIds": [numericInstallmentId],
        "password": "@Adiante123",
        "discountCode": "",
        "couponCode": ""
      },
      failOnStatusCode: false,
    });
  }
  InvalidOperation() {
        cy.request({
          'method': 'POST',
          'url': `${routes.env.dev_gateway}/customer/v4/invoice/operation`,
          'headers': {
            'user_type': 'customer',
            'customer_ip': 'localhost',
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json'
          },
          body: {
            "installmentIds": [numericInstallmentId],
            "password": "@Adiante123",
            "discountCode": "",
            "couponCode": ""
          },
          failOnStatusCode: false,
        });
  }
  operationWithoutPassword() {
    cy.request({
      'method': 'POST',
      'url': `${routes.env.dev_gateway}/customer/v4/invoice/operation`,
      'headers': {
        'user_type': 'customer',
        'Authorization': `Bearer ${window.localStorage.getItem('sessionToken')}`,
        'Content-Type': 'application/json'
      },
      body: {
        "installmentIds": [       
        ],
        "password": "",
        "discountCode": "",
        "couponCode": ""
      },

      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq("Fill in all fields correctly");
    });
  }
}

export default new OperationAsync


