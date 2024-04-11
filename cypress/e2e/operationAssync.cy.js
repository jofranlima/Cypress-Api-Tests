import sql from "../pages/SQL/sql"
import RegistrationData from "../pages/backend/RegistrationData"
import operation from "../pages/backend/OperationAsync"
import Upload from "../pages/backend/upload"
import SocketAssertions  from "../pages/backend/socket"

beforeEach(() => {
    RegistrationData.createSession();
    cy.clearAllCookies()
    // cy.clearLocalStorage()
  });
  after(() =>{
    sql.liquidadeClintOperations()
  });

it.only('Valid Operation', () => {
    Upload.oneNFeUpload();

    // Usamos cy.wrap para criar uma promessa e esperamos a resolução dela
    cy.wrap(operation.operation()).then(() => {
       
        
        SocketAssertions.handleMessageApproved();
    });
    cy.responseTimeout(10000)
});

it('Invalid Operation', () => {
    Upload.oneNFeUpload();
    cy.wrap(operation.InvalidOperation()).then(()=>{
    
        SocketAssertions.handleMessageRepproved();

    })
    operation.InvalidOperation
    cy.wait(1000);
})
it('operationWithoutPassword', () => {
    operation.operationWithoutPassword()
})