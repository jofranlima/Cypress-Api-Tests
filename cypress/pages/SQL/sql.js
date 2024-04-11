class sql {

validadeteModeloAnalise(){
      cy.task("queryDb", "SELECT * FROM `tb_example_analise` where id=1").then(
        (result) => {
          expect(result[19].id).to.equal(22);
        }
      )}

      validadeteInsert(){
       cy.task("queryDb", "SELECT * FROM `tb_example_analise` WHERE id=1 AND name = 'Teste 01'").then((result) => {
          expect(result.length).to.be.greaterThan(0);
      });
      
    }
    liquidadeClintOperations(){
      cy.task("queryDb", "UPDATE tb_duplicata SET valor_pago = valor_parcela, status_pagamento = 1, data_pagamento = CURDATE() WHERE nota_id IN (SELECT id FROM tb_example WHERE cliente_id = 1254848471)")
    }
  }

export default new sql;
