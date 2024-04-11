import RejectionAnalisys from "../pages/backend/decision-engine"
import RegistrationData from "../pages/backend/RegistrationData"


it.only('Create session', () => {
    RegistrationData.createSession()

})
it('Nota sem nenhum tipo de pagamento', () => {
    RejectionAnalisys.validateCFOP()

})
it('CFOP Bloqueado', () => {
    RejectionAnalisys.CFOPBloqued()

})
it.only('Nota sem Vpag', () => {
    RejectionAnalisys.withoutVpag()

})
it('Nota com vPag zero', () => {
    RejectionAnalisys.vPagZero()

})
it('Nota com detpag menor que numero de parcelas', () => {
    RejectionAnalisys.onlyOneDetPag()

})
it('Nota com detpag maior que numero de parcelas', () => {
    RejectionAnalisys.maisDetPagQueParcela()

})
it('Nota sem nenhum detalhe de pagamento', () => {
    RejectionAnalisys.semDetPag()

})
it('Nota com soma de parcelas diferente do valor da nota', () => {
    RejectionAnalisys.somaDasParcelasDiferentes()

})
it('Nota de marketplace', () => {
    RejectionAnalisys.nfeMarketplace()

})




