
import type { IPurchase } from "../Models/purchase.model.js";
import purchaseModel from "../Models/purchase.model.js";
import DBRepo from "./db.repo.js";


class purchaseRepo extends DBRepo<IPurchase> {
  constructor() {
    super(purchaseModel);
  }
 
}

export default new purchaseRepo();
