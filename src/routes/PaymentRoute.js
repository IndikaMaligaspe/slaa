const e = require("express");
const {
  makePayment,
  getPayments,
  getPaymentByLedgerId,
  getPaymentsByDate,
  getPaymentsByDojo,
  getPaymentsByPayee,
} = require("../controllers/PaymentController");

const validateRequest = require("../middleware/preValidateRequests");

const PaymentModel = require("../models/PaymentModel");

const express = require("express"),
  router = express.Router();

router.get("/:lid", validateRequest, (req, res) => {
  const ledgerId = req.params.lid;
  getPaymentByLedgerId(ledgerId)
    .then((response) => {
      if (response) res.jsonp(response);
      else res.send(404);
    })
    .catch((err) => {
      res.send(500, err);
    });
});

router.get("/", (req, res) => {
  const paymentDate = req.query.pdate;
  const dojo = req.query.dojo;
  const payee = req.query.payee;

  if (paymentDate) {
    getPaymentsByDate(paymentDate)
      .then((response) => {
        if (response) res.jsonp(response);
        else res.send(404);
      })
      .catch((err) => {
        res.send(500, err);
      });
  } else if (dojo) {
    getPaymentsByDojo(dojo)
      .then((response) => {
        if (response) res.jsonp(response);
        else res.send(404);
      })
      .catch((err) => {
        res.send(500, err);
      });
  } else if (payee) {
    getPaymentsByPayee(payee)
      .then((response) => {
        if (response) res.jsonp(response);
        else res.send(404);
      })
      .catch((err) => {
        res.send(500, err);
      });
  } else {
    getAllMembers()
      .then((response) => {
        if (response) res.jsonp(response);
        else res.send(404);
      })
      .catch((err) => {
        res.send(500, err);
      });
  }
});
