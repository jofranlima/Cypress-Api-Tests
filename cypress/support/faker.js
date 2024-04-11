import { faker } from '@faker-js/faker'
faker.locale = 'pt_BR'

function email() {
  return 'automation'+ faker.internet.email();
}
function accountNumber() {
  return faker.datatype.number({
    min: 10000,
    max: 99999,
  });
}
function agencyNumber() {
  return faker.datatype.number({
    min: 1000,
    max: 9999,
  });
}

function phoneNumber() {
  return faker.datatype.number({
    min: 99900000000,
    max: 99999999999,
  });
}
function automationEmail(){
  return faker.datatype.number({
    min: 1000,
    max: 9999,
  })
}
module.exports = {

  email: email,
  accountNumber: accountNumber,
  agencyNumber: agencyNumber,
  phoneNumber:phoneNumber,
  automationEmail:automationEmail
}
