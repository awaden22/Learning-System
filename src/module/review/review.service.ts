
import courseRepo from "../../DB/Repo/course.repo.js";
import purchaseRepo from "../../DB/Repo/purchase.repo.js";
import userRepo from "../../DB/Repo/user.repo.js";
import type { createReviewDto, updateReviewDto } from "./review.dto.js";
import { ConflictException, NotFoundException } from "../../common/exceptions/domain.exception.js";
import reviewRepo from "../../DB/Repo/review.repo.js";





class ReviewService {

  private _userRepo = userRepo
  private _courseRepo = courseRepo
  private _purchaseRepo = purchaseRepo
  private _reviewRepo = reviewRepo


  constructor() { }


  async createReview(bodydata: createReviewDto, userId: string) {


    const user = await this._userRepo.findOne({
      filter: {
        _id: userId
      }
    })

    if (!user) {
      throw new NotFoundException("user not found")
    }

    const course = await this._courseRepo.findOne({
      filter: {
        _id: bodydata.course_id,
        isActive: true
      }
    })

    if (!course) {
      throw new NotFoundException("course not found")
    }

    const purchaseCourse = await this._purchaseRepo.findOne({
      filter: {
        user_id: userId,
        course_id: bodydata.course_id
      }
    })

    if (!purchaseCourse) {
      throw new NotFoundException("course not purchased")
    }

    const reviewExist = await this._reviewRepo.findOne({
      filter: {
        user_id: userId,
        course_id: bodydata.course_id
      }
    })

    if (reviewExist) {
      throw new ConflictException("review already exist")
    }


    const review = await this._reviewRepo.create({
      data: {
        user_id: userId,
        ...bodydata,

      }
    })

    await this.updateCourseRate(bodydata.course_id)

    return review




  }

  async getCourseReviews(courseId: string) {
    const course = await this._courseRepo.findOne({
      filter: {
        _id: courseId,
        isActive: true
      }
    })
    if (!course) {
      throw new NotFoundException("course not found")
    }

    const reviews = await this._reviewRepo.find({
      filter: {
        course_id: courseId
      }
    })

    if (reviews.length === 0) {
      throw new NotFoundException("review not found")
    }

    return reviews

  }

  async updateReview(bodydata: updateReviewDto, userId: string, courseId: string) {


    const user = await this._userRepo.findOne({
      filter: {
        _id: userId
      }
    })
    if (!user) {
      throw new NotFoundException("user not found")
    }

    const updateReview = await this._reviewRepo.findandUpdate({
      filter: {
        user_id: userId,
        course_id: courseId
      },
      update: {
        ...bodydata
      },
      options: {
        returnDocument: "after"
      }
    })
    if (!updateReview) {
      throw new NotFoundException("review not found")
    }


    await this.updateCourseRate(courseId)


    return updateReview
  }

  async deleteReview(courseId: string, userId: string) {

    const user = await this._userRepo.findOne({
      filter: {
        _id: userId
      }
    })
    if (!user) {
      throw new NotFoundException("user not found")
    }


    const review = await this._reviewRepo.findOne({
      filter: {
        course_id: courseId,
        user_id: userId
      }
    })
    if (!review) {
      throw new NotFoundException("review not found")
    }


    await this._reviewRepo.deleteOne({
      filter: {
        course_id: courseId,
        user_id: userId
      }
    })

    await this.updateCourseRate(courseId)


    return {
      message: "review deleted successfully"
    }

  }


  private async updateCourseRate(courseId: string) {
    const reviews = await this._reviewRepo.find({
      filter: {
        course_id: courseId
      }
    })

    const totalRating = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    )

    const avgRating = reviews.length
      ? totalRating / reviews.length
      : 0

    await this._courseRepo.findandUpdate({
      filter: {
        _id: courseId,
        isActive: true
      },
      update: {
        rate: avgRating
      },
      options: {
        returnDocument: "after"
      }

    })
  }


}


export default new ReviewService();
