import select from "../pages/SQL/tb_criterios_analise"
import panelRequests from "../pages/Panel/analisysmodels"

it('Get All criteria', () => {
    panelRequests.getAllCriteria()
})

it('Get Empty Criteria', () => {
    panelRequests.getEmptyCriteria()

})

it.only('Get disabled criteria', () => {
    panelRequests.getDisablesCriteria()
})

it('Insert criteria and Validate', () => {
    panelRequests.newAnalisysCriteria()
    select.validadeteModeloAnalise()
})

it('Criteria Already registered', () =>{
    panelRequests.criteriaAlreadyRegistered()

})
it('Disable installments',()=>{
    panelRequests.disableInstallments()
    //validar banco
})
it('Disable invoice analisys',()=>{
    panelRequests.disableInvoiceAnalisys()
})

it('Get invoice',()=>{
    panelRequests.getInvoiceAndInstallmentsAnalisys()
})
