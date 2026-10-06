

import { randomUUID } from "node:crypto";
import {  ConflictException, NotFoundException } from "../../common/exceptions/domain.exception.js";
import s3BuketService from "../../common/S3Buket/s3.buket.service.js";
import courseRepo from "../../DB/Repo/course.repo.js";

import instructorRepo from "../../DB/Repo/instructor.repo.js";

import type { CreateIntructorDto, UpdateIntructorDto } from "./instructor.dto.js";

class instructorService {
  private _instructorRepo = instructorRepo;
  private _courseRepo = courseRepo;

  private _s3buket = s3BuketService

  constructor() { }

  async createInstructor(bodydata: CreateIntructorDto, file: Express.Multer.File) {


   
    let image: string | undefined

    if (file) {
      image = await this._s3buket.upload({
        file,
        path: `instructor/${randomUUID()}`
      })
    }

    const instructor = await this._instructorRepo.create({
      data: {
        name: bodydata.name,
        description: bodydata.description,
        jobTittle: bodydata.jobTittle,
        image_url: image,

      }
    })
    return instructor


  }

  async getinstructor(idinstructor: string) {
    const instructor = await this._instructorRepo.findOne({
      filter: {
        _id: idinstructor,
        isActive: true,
      },
    });
    if (!instructor) {
      throw new NotFoundException("instructor not found")
    }
    return instructor
  }

  async getAllInstructor(
    size: number,
    page: number,
    name?: string,
    jobTittle?: string
  ) {
    const filter: any = {
      isActive: true
    };

    if (name) {
      filter.name = {
        $regex: name,
        $options: "i"
      };
    }

    if (jobTittle) {
      filter.jobTittle = jobTittle;
    }

    return await this._instructorRepo.paginate({
      filter,
      size,
      page
    });
  }

  async getTopInstructors(limit: number = 4) {

    const instructors = await this._instructorRepo.find({
      filter: {
        isActive: true
      },
      options: {
        limit,
        sort:{
          rate:-1
        }
      }
    });

    if (instructors.length === 0) {
      throw new NotFoundException("instructor not found");
    }

    return instructors;
  }

  async deleteInstructor(idInstructor: string) {
    const instructor = await this._instructorRepo.findOne({
      filter: {
        _id: idInstructor,
        isActive: true
      }
    })

    if (!instructor) {
      throw new NotFoundException("instructor not found")
    }

    const instructorFound = await this._courseRepo.findOne({
      filter: {
        instructor_id: idInstructor
      }
    })
    if (instructorFound) {
      throw new ConflictException("intructor found in course")
    }

    await this._instructorRepo.updateOne({
      filter: {
        _id: idInstructor
      },
      update: {
        isActive: false
      }
    })
    return {
      message: "instructor deleted successful"
    }
  }

  async updateInstructor(bodydata: UpdateIntructorDto, idInstructor: string, file: Express.Multer.File) {
    const instructor = await this._instructorRepo.findOne({
      filter: {
        _id: idInstructor,
        isActive: true
      }
    })

    if (!instructor) {
      throw new NotFoundException("instructor not found")
    }

    let image = instructor.image_url

    let oldImage: string | null = null;

 if (file) {
  oldImage = instructor.image_url ?? null;

  image = await this._s3buket.upload({
    file,
    path: `instructor/${randomUUID()}`
  }) as string;
}

const newInstructor = await this._instructorRepo.findandUpdate({
  filter: {
    _id: idInstructor
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

return newInstructor;

}
}

export default new instructorService();
