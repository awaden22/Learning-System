
import type { IReview } from "../Models/review.model.js";
import reviewModel from "../Models/review.model.js";
import DBRepo from "./db.repo.js";


class reviewRepo extends DBRepo<IReview> {
  constructor() {
    super(reviewModel);
  }
 
}

export default new reviewRepo();
