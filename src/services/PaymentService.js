const PaymentSchema = require("../schemas/Mongo/PaymentSchema");

async function createPayment(paymentModel) {
  return new Promise(async (resolve, reject) => {
    try {
      const dojo = new PaymentSchema({
        name: dojoModel.name,
        address: dojoModel.address,
        capacity: dojoModel.capacity,
        active: dojoModel.active ? dojoModel.active : false,
        schedules: dojoModel.schedules,
      });
      await dojo.save();
      dojoModel.id = dojo._id;
      resolve(dojoModel);
    } catch (err) {
      reject(err);
    }
  });
}
