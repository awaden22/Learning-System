

import { randomUUID } from "node:crypto";
import { ConflictException, NotFoundException } from "../../common/exceptions/domain.exception.js";
import s3BuketService from "../../common/S3Buket/s3.buket.service.js";
import categoryRepo from "../../DB/Repo/category.repo.js";
import courseRepo from "../../DB/Repo/course.repo.js";
import instructorRepo from "../../DB/Repo/instructor.repo.js";
import purchaseRepo from "../../DB/Repo/purchase.repo.js";

import type { CreateCourseDto, UpdateCourseDto } from "./course.dto.js";



class courseService {
  private _courseRepo = courseRepo;
  private _categoryRepo = categoryRepo;
  private _instructorRepo = instructorRepo;
  private _purchaseRepo = purchaseRepo;
  private _s3buket = s3BuketService

  constructor() { }

  async createCourse(bodydata: CreateCourseDto, file: Express.Multer.File) {


    const categoryExist = await this._categoryRepo.findOne({
      filter: {
        _id: bodydata.category_id,
        isActive: true
      }
    })
    if (!categoryExist) {
      throw new NotFoundException("category not found")
    }


    const courseExist = await this._courseRepo.findOne({
      filter: {
        courseName: bodydata.courseName,
        isActive: true
      }
    })
    if (courseExist) {
      throw new ConflictException("Course name already exists");
    }

    const instructorExist = await this._instructorRepo.findOne({
      filter: {
        _id: bodydata.instructor_id,
        isActive: true
      }
    })
    if (!instructorExist) {
      throw new NotFoundException("instructor not found")
    }


    let image: string | undefined

    if (file) {
      image = await this._s3buket.upload({
        file,
        path: `course/${randomUUID()}`
      })
    }
    const course = await this._courseRepo.create({
      data: {
        ...bodydata,
        image_url: image

      }
    })
    return course


  }

  async getCourse(idCourse: string) {
    const course = await this._courseRepo.findOne({
      filter: {
        _id: idCourse,
        isActive: true,
      },
    });
    if (!course) {
      throw new NotFoundException("course not found")
    }
    return course
  }

  async getAllCourse(
    size: number,
    page: number,
    courseName?: string,
    category_id?: string,
    rate?: number,
    price?: number) {
    const filter: any = {
      isActive: true
    }

    if (courseName) {
      filter.courseName = {
        $regex: courseName,
        $options: "i"
      };
    }

    if (rate !== undefined) {
      filter.rate = rate;
    }

    if (price !== undefined) {
      filter.cost = price;
    }

    if (category_id) {
      filter.category_id = category_id
    }
    const course = await this._courseRepo.paginate({
      filter,
      size,
      page, options: {
        sort: {
          createdAt: -1
        }

      }
    })
    
    return course
  }

  async deletecourse(idCourse: string) {
    const course = await this._courseRepo.findOne({
      filter: {
        _id: idCourse,
        isActive: true
      }
    })
    if (!course) {
      throw new NotFoundException("course not found")
    }

    const purchaseCourse = await this._purchaseRepo.findOne({
      filter: {

        course_id: idCourse
      }
    })

    if (purchaseCourse) {
      throw new ConflictException("course already purchased")
    }



    await this._courseRepo.updateOne({
      filter: {
        _id: idCourse
      },
      update: {
        isActive: false
      }
    })
    return {
      message: "course deleted successful"
    }
  }

  async updateCourse(
    bodydata: UpdateCourseDto,
    idCourse: string,
    file?: Express.Multer.File
  ) {


    if (bodydata.category_id) {
      const categoryExist = await this._categoryRepo.findOne({
        filter: {
          _id: bodydata.category_id,
          isActive: true
        }
      });

      if (!categoryExist) {
        throw new NotFoundException("category not found");
      }
    }

    if (bodydata.instructor_id) {
      const instructorExist = await this._instructorRepo.findOne({
        filter: {
          _id: bodydata.instructor_id,
          isActive: true
        }
      });

      if (!instructorExist) {
        throw new NotFoundException("instructor not found");
      }
    }

    const course = await this._courseRepo.findOne({
      filter: {
        _id: idCourse,
        isActive: true
      }
    });

    if (!course) {
      throw new NotFoundException("course not found");
    }

    const purchaseCourse = await this._purchaseRepo.findOne({
      filter: {
        course_id: idCourse
      }
    });

    if (purchaseCourse) {
      throw new ConflictException("course already purchased");
    }

    if (bodydata.courseName) {
      const courseExist = await this._courseRepo.findOne({
        filter: {
          courseName: bodydata.courseName,
          _id: { $ne: idCourse },
          isActive: true
        }
      });

      if (courseExist) {
        throw new ConflictException("Course name already exists");
      }
    }

    let image = course.image_url;
    let oldImage: string | null = null;

    if (file) {
      oldImage = course.image_url
      image = await this._s3buket.upload({
        file,
        path: `course/${randomUUID()}`
      }) as string
    }


    const newCourse = await this._courseRepo.updateOne({
      filter: {
        _id: idCourse
      },
      update: {
        ...bodydata,
        image_url: image
      }
    });
    if (oldImage) {
      await this._s3buket.deleteFile([
        {
          key: oldImage
        }
      ]);
    }
    return newCourse
  }

  async getTopCourses(limit: number = 4) {

    const course = await this._courseRepo.find({
      filter: {
        isActive: true
      },
      options: {
        limit,
        sort: {
          rate: -1
        }
      }
    });

    if (course.length === 0) {
      throw new NotFoundException("course not found");
    }

    return course;
  }

  async getSimilarCourses(idCourse: string) {

    const course = await this._courseRepo.findOne({
      filter: {
        _id: idCourse,
        isActive: true
      }
    })

    if (!course) {
      throw new NotFoundException("course not found")
    }

    const similarCourse = await this._courseRepo.find({
      filter: {
        _id: { $ne: idCourse },
        category_id: course.category_id,
        isActive: true
      },
      options: {
        sort: {
          createdAt: -1
        },
        limit: 4
      }
    })
    return similarCourse


  }


}


export default new courseService();
