class PaymentModel {
  constructor(id, date, amount, currency, type, payementType, payeeId) {
    this.id = id;
    this.date = date;
    this.amount = amount;
    this.currency = currency;
    this.type = type;
    this.payementType = payementType;
    this.payeeId = payeeId;
  }
}
