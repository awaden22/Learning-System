

import { randomUUID } from "node:crypto";
import { BadRequestException, ConflictException, NotFoundException } from "../../common/exceptions/domain.exception.js";
import s3BuketService from "../../common/S3Buket/s3.buket.service.js";
import categoryRepo from "../../DB/Repo/category.repo.js";
import type { CreateCategoryDto, UpdateCategoryDto } from "./category.dto.js";

class CategoryService {
  private _categoryRepo = categoryRepo;
  private _s3buket = s3BuketService

  constructor() { }

  async createCategory(bodydata: CreateCategoryDto, file: Express.Multer.File) {
    const { name } = bodydata

    const categoryName = await this._categoryRepo.findOne({
      filter: {
        name,
        isActive: true
      }
    })
    if (categoryName) {
      throw new BadRequestException("Category already exist")
    }
    if (!file) {
      throw new NotFoundException("Image not found")
    }
    const image = await this._s3buket.upload({
      file,
      path: `category/${randomUUID()}`
    })
    const category = await this._categoryRepo.create({
      data: {
        name,
        image_url: image
      }
    })
    return category

  }

  async getCategory(idCategory: string) {
    const category = await this._categoryRepo.findOne({
      filter: {
        _id: idCategory,
        isActive: true,
      },
    });
    if (!category) {
      throw new NotFoundException("category not found")
    }
    return category
  }

  async getAllCategory(size: number, page: number) {
    const category = await this._categoryRepo.paginate({
      filter: {
        isActive: true
      },
      size,
      page
    })
    if (category.docs.length === 0) {
      return {
        "docs": [],
        "totalDocs": 0
      }
    }
    return category
  }

  async deleteCategory(idCategory: string) {
    const category = await this._categoryRepo.findOne({
      filter: {
        _id: idCategory,
        isActive: true
      }
    })
    if (!category) {
      throw new NotFoundException("category not found")
    }
    await this._categoryRepo.updateOne({
      filter: {
        _id: idCategory
      },
      update: {
        isActive: false
      }
    })
    return {
      message: "category deleted successful"
    }
  }

  async updateCategory(
    bodydata: UpdateCategoryDto,
    idCategory: string,
    file?: Express.Multer.File
  ) {
    const category = await this._categoryRepo.findOne({
      filter: {
        _id: idCategory,
        isActive: true
      }
    });

    if (!category) {
      throw new NotFoundException("category not found");
    }

    if (bodydata.name) {
      const categoryExist = await this._categoryRepo.findOne({
        filter: {
          name: bodydata.name,
          _id: { $ne: idCategory },
          isActive: true
        }
      });

      if (categoryExist) {
        throw new ConflictException("category already exist");
      }
    }
    let image = category.image_url;
    let oldImage: string | null = null;

    if (file) {
       oldImage = category.image_url


      image = await this._s3buket.upload({
        file,
        path: `category/${randomUUID()}`
      }) as string;

     
    }



    const newCategory = await this._categoryRepo.updateOne({
      filter: {
        _id: idCategory
      },
      update: {
        ...bodydata,
        image_url: image
      }
    });

    if (oldImage) {
      await this._s3buket.deleteFile([
        { key: oldImage }
      ]);
      return newCategory;
    }
  }
}

export default new CategoryService();
