import type { ICategory } from "../Models/category.model.js";
import categoryModel from "../Models/category.model.js";
import DBRepo from "./db.repo.js";


class categoryRepo extends DBRepo<ICategory> {
  constructor() {
    super(categoryModel);
  }
 
}

export default new categoryRepo();
