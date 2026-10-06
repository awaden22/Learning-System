import type { ICart } from "../Models/cart.model.js";
import cartModel from "../Models/cart.model.js";
import DBRepo from "./db.repo.js";


class cartRepo extends DBRepo<ICart> {
  constructor() {
    super(cartModel);
  }
 
}

export default new cartRepo();
