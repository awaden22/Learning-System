
import contentCourseModel, { type ICourseContent } from "../Models/contentCourse.mode.js";
import DBRepo from "./db.repo.js";


class courseContentSchemaRepo extends DBRepo<ICourseContent> {
  constructor() {
    super(contentCourseModel);
  }
 
}

export default new courseContentSchemaRepo();
