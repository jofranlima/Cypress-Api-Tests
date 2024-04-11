require('dotenv').config();
import { routes } from "../../configs/routes.js";
const basicAuthorization = `Basic ${Cypress.env('INTEGRATION_TOKEN')}`;

class panelRequests {

    createSession(){
        cy.request({
            method:'POST',
            url: `${routes.env.dev_gateway}/autenticacao/login/adm`,
            
            body:{
                email: "jofran.lima@example.com", 
                senha: "Example"
                }
            })
            .then(response => {
                expect(response.body.criteria).to.not.be.empty
            })
    }
    getAllCriteria() {
        cy.request({
            method: 'GET',
            url: `${routes.env.dev_gateway_invoice}/analysis/model/criteria/1`,
            headers: {
                'Context-Type': 'application/json',
            },
            body: {}
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.criteria).to.not.be.empty;
        });
    }
        getDisablesCriteria() {
            cy.request({
                method: 'GET',
                url: `${routes.dev_gateway_invoice}/analysis/model/criteria/1`,
                headers: {
                    'Context-Type': 'application/json',
                },
                body: {}
            }).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body.criteria).to.not.be.empty;
                expect(response.body.criteria).have.value('Verifica Idade Mínima Email Corporativo')
            })
        }
    getEmptyCriteria() {
        cy.request({
            method: 'GET',
            url: `${routes.dev_gateway_invoice}/analysis/model/criteria/2`,
            headers: {
                'Context-Type': 'application/json',
            },
            body: {},
            failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.criteria).to.be.empty;
        });
    }
    getAllAnalisysModels() {

        cy.request({
            method: 'GET',
            url: `${routes.dev_gateway_invoice}/analysis/models`,
            headers: {
                'Context-Type': 'application/json',
                'Authorization': basicAuthorization,
            },
            body: {}
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.models).to.not.be.empty;
        });
    }
    newAnalisysCriteria() {
        cy.request({
            method: 'POST',
            url: `${routes.dev_gateway_invoice}/analysis/criteria`,
            headers: {
                'Context-Type': 'application/json'
            },
            body: {
                "mimeType": "application/json",
                "text": "{\n\t\"modelAnalysisId\": 1,\n\t\"messageId\": 1,\n\t\"name\": \"Analise de rejeicao\",\n\t\"createdBy\": \"Cypress\",\n\t\"description\": \"teste\"\n}"
            },
            failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(200);
        })
    }
    criteriaAlreadyRegistered() {
        cy.request({
            method: 'POST',
            url: `${routes.dev_gateway_invoice}/analysis/criteria`,
            headers: {
                'Context-Type': 'application/json'
            },
            body: {
                "mimeType": "application/json",
                "text": "{\n\t\"modelAnalysisId\": 1,\n\t\"messageId\": 1,\n\t\"name\": \"Teste 01\",\n\t\"createdBy\": \"rafa\",\n\t\"description\": \"teste\"\n}"
            },
            failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(200);
        })
    }
    disableInstallments() {
        cy.request({
            method: 'DELETE',
            url: `${routes.dev_gateway_invoice}/analysis/installment/12`,
            headers: {
            },
            body: {
            },
            failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(200);
        });
    }
    disableInvoiceAnalisys() {
        cy.request({
            method: 'DELETE',
            url: `${routes.dev_gateway_invoice}/analysis/invoice/1`,
            headers: {
                'Context-Type': 'application/json',
                'Authorization': basicAuthorization,
            },
            body: {
            },
            failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(200);

        });
    }
    getInvoiceAndInstallmentsAnalisys() {
        cy.request({
            method: 'GET',
            url: `${routes.dev_gateway_invoice}/analysis/performed`,
            headers: {
                'Context-Type': 'application/json',
                'Authorization': basicAuthorization,
            },
            body: {
             
                "invoiceId": "350501",
                "installmentId": "607129"
                
            },
            failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.models).to.not.be.empty;

        });

    }
}


export default new panelRequests