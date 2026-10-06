
import type { IPayment } from "../Models/payment.model.js";
import paymentModel from "../Models/payment.model.js";
import DBRepo from "./db.repo.js";


class paymentRepo extends DBRepo<IPayment> {
  constructor() {
    super(paymentModel);
  }
 
}

export default new paymentRepo();
