
import type { ICourse } from "../Models/course.model.js";
import courseModel from "../Models/course.model.js";
import DBRepo from "./db.repo.js";


class courseRepo extends DBRepo<ICourse> {
  constructor() {
    super(courseModel);
  }
 
}

export default new courseRepo();
