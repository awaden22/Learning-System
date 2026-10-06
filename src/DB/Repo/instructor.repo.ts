
import type { IInstructor } from "../Models/instructor.model.js";
import instructorModel from "../Models/instructor.model.js";
import DBRepo from "./db.repo.js";


class instructorRepo extends DBRepo<IInstructor> {
  constructor() {
    super(instructorModel);
  }
 
}

export default new instructorRepo();
