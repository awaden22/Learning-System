

import { ConflictException, NotFoundException } from "../../common/exceptions/domain.exception.js";

import courseRepo from "../../DB/Repo/course.repo.js";
import courseContentRepo from "../../DB/Repo/courseContent.repo.js";
import type { CreateCourseContentDto, UpdateCourseContentDto } from "./courseContent.dto.js";




class courseService {
  private _courseRepo = courseRepo;
  private _courseContentRepo = courseContentRepo;


  constructor() { }

  async createCourseContent(bodydata: CreateCourseContentDto) {


    const course = await this._courseRepo.findOne({
      filter: {
        _id: bodydata.course_id,
        isActive: true
      }
    })
 if (!course) {
  throw new NotFoundException("Course not found");
}

    const contentNameExist = await this._courseContentRepo.findOne({
      filter: {
        name: bodydata.name,
        course_id: bodydata.course_id,
        isActive: true
      }
    })
    if (contentNameExist) {
      throw new ConflictException("Content name already exists");
    }

    const courseContent = await this._courseContentRepo.create({
      data: {
        ...bodydata,
      }
    })
    return courseContent

  }

  async getContent(idCourseContent: string) {
    const courseContent = await this._courseContentRepo.findOne({
      filter: {
        _id: idCourseContent,
        isActive: true,
      },
    });
    if (!courseContent) {
      throw new NotFoundException("courseContent not found")
    }
    return courseContent
  }

  async getAllCourseContent(idCourse: string) {
    const course = await this._courseRepo.findOne({
      filter: {
        _id: idCourse,
        isActive: true
      }
    });

    if (!course) {
      throw new NotFoundException("course not found");
    }

    const allContent = await this._courseContentRepo.find({
      filter: {
        course_id: idCourse,
        isActive: true
      }
    });

    return allContent;
  }

  async deleteContent(idContent: string) {
    const courseContent = await this._courseContentRepo.findOne({
      filter: {
        _id: idContent,
        isActive: true
      }
    })
    if (!courseContent) {
      throw new NotFoundException("course content not found")
    }




    await this._courseContentRepo.updateOne({
      filter: {
        _id: idContent
      },
      update: {
        isActive: false
      }
    })
    return {
      message: "courseContent deleted successful"
    }
  }

  async updateContent(
    bodydata: UpdateCourseContentDto,
    idContent: string
  ) {
    const content = await this._courseContentRepo.findOne({
      filter: {
        _id: idContent,
        isActive: true
      }
    });

    if (!content) {
      throw new NotFoundException("content not found");
    }

    if (bodydata.name) {
      const contentNameExist = await this._courseContentRepo.findOne({
        filter: {
          name: bodydata.name,
          course_id: content.course_id,
          _id: { $ne: idContent },
          isActive: true
        }
      });

      if (contentNameExist) {
        throw new ConflictException("content name already exists");
      }
    }

    const newContent = await this._courseContentRepo.updateOne({
      filter: {
        _id: idContent
      },
      update: {
        ...bodydata
      }
    });

    return newContent;
  }

  async getOtherContents(idContent: string) {

    const content = await this._courseContentRepo.findOne({
      filter: {
        _id: idContent,
        isActive: true
      },


    });
    if (!content) {
      throw new NotFoundException("courseContent not found")
    }

    const othercontent = await this._courseContentRepo.find({
      filter: {
        _id: { $ne: idContent },
        course_id: content.course_id,
        isActive: true
      },


    });

   
    return othercontent;
  }


}


export default new courseService();
