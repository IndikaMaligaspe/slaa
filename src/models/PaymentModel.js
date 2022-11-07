class PaymentModel {
  constructor(
    id,
    ledgerId,
    date,
    amount,
    currency,
    type,
    payementType,
    payeeId,
    dojoId
  ) {
    this.id = id;
    this.ledgerId = ledgerId;
    this.date = date;
    this.amount = amount;
    this.currency = currency;
    this.type = type;
    this.payementType = payementType;
    this.payeeId = payeeId;
    this.dojoId = dojoId;
  }
}

modules.export = PaymentModel;
