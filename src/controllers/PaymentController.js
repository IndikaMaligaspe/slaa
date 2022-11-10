const {
  createPayment,
  findAllPayments,
  findPaymentByLedgerId,
  findPaymentsByDate,
  findPaymentsByDojo,
  findPaymentsByPayee,
} = require("../services/PaymentService");

async function makePayment(paymentModel) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await createPayment(paymentModel);
      if (response) resolve(response);
      else resolve(false);
    } catch (err) {
      reject(err.message);
    }
  });
}

async function getPayments() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await findAllPayments();
      if (response) resolve(response);
      else resolve(false);
    } catch (err) {
      reject(err.message);
    }
  });
}

async function getPaymentByLedgerId(ledgerId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await findPaymentByLedgerId(ledgerId);
      if (response) resolve(response);
      else resolve(false);
    } catch (err) {
      reject(err.message);
    }
  });
}

async function getPaymentsByDate(date) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await findPaymentsByDate(date);
      if (response) resolve(response);
      else resolve(false);
    } catch (err) {
      reject(err.message);
    }
  });
}

async function getPaymentsByDojo(dojo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await findPaymentsByDojo(dojo);
      if (response) resolve(response);
      else resolve(false);
    } catch (err) {
      reject(err.message);
    }
  });
}

async function getPaymentsByPayee(payee) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await findPaymentsByPayee(payee);
      if (response) resolve(response);
      else resolve(false);
    } catch (err) {
      reject(err.message);
    }
  });
}

module.exports = {
  makePayment,
  getPayments,
  getPaymentByLedgerId,
  getPaymentsByDate,
  getPaymentsByDojo,
  getPaymentsByPayee,
};
