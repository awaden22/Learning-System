

import { RoleEnum } from "../../common/enums/user.enums.js"
import categoryRepo from "../../DB/Repo/category.repo.js"
import courseRepo from "../../DB/Repo/course.repo.js"
import instructorRepo from "../../DB/Repo/instructor.repo.js"
import userRepo from "../../DB/Repo/user.repo.js"
import reviewRepo from "../../DB/Repo/review.repo.js"

class landingService {

    private _courseRepo = courseRepo
    private _userRepo = userRepo
    private _instructorRepo = instructorRepo
    private _categoryRepo = categoryRepo
    private _reviewRepo = reviewRepo


    constructor() { }

    async getStats() {

        const categories = await this._categoryRepo.allCount({
            isActive: true
        })

        const courses = await this._courseRepo.allCount({
            isActive: true
        })

        const instructors = await this._instructorRepo.allCount({
            isActive: true
        })

        const students = await this._userRepo.allCount({
            role: RoleEnum.User
        })

        return {
            categories,
            courses,
            instructors,
            students
        }
    }

    async getTopCategories() {

        const topCategories = await this._courseRepo.aggregate([

            {
                $match: {
                    isActive: true
                }
            },
            {
                $group: {
                    _id: "$category_id",
                    countCourses: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $sort: {
                    countCourses: -1
                }

            },
            {

                $limit: 4
            }

        ]);

        return topCategories
    }

    async getTopCourses() {

        const topCourses = await this._courseRepo.aggregate([

            {
                $match: {
                    isActive: true
                }
            },

            {
                $lookup: {
                    from: "contentcourses",
                    localField: "_id",
                    foreignField: "course_id",
                    as: "content"
                }
            },

            {
                $lookup: {
                    from: "instructors",
                    localField: "instructor_id",
                    foreignField: "_id",
                    as: "instructor"
                }
            },

            {
                $addFields: {
                    lectures: {
                        $sum: "$content.lecturesNumber"
                    }
                }
            },

            {
                $sort: {
                    rate: -1
                }
            },

            {
                $limit: 4
            }

        ])

        return topCourses
    }

    async getTopInstructors() {

        const topInstructors = await this._instructorRepo.aggregate([
            {
                $match: {
                    isActive: true
                }
            },
            {
                $lookup: {
                    from: "courses",
                    localField: "_id",
                    foreignField: "instructor_id",
                    as: "courses"
                }
            },
            {
                $unwind: "$courses"
            },
            {
                $lookup: {
                    from: "purchases",
                    localField: "courses._id",
                    foreignField: "course_id",
                    as: "purchases"
                }
            },
            {
                $unwind: "$purchases"
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    image_url: { $first: "$image_url" },
                    jobTittle: { $first: "$jobTittle" },
                    rate: { $first: "$rate" },
                    users: { $addToSet: "$purchases.user_id" }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image_url: 1,
                    jobTittle: 1,
                    rate: 1,
                    students: { $size: "$users" }
                }
            },
            {
                $sort: {
                    students: -1
                }
            },
            {
                $limit: 4
            }
        ])

        return topInstructors
    }

    async getCustomerReviews() {
        const topReviews = await this._reviewRepo.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $sort: {
                    rating: -1
                }
            },
            {
                $limit: 3
            },
            {
                $project: {
                    _id: 1,
                    rating: 1,
                    comment: 1,
                    "user.name": 1,
                    "user.profilePic": 1
                }
            }
        ])

        return topReviews
    }

    async getLanding() {

        const stats = await this.getStats()
        const topCategories = await this.getTopCategories()
        const topCourses = await this.getTopCourses()
        const topInstructors = await this.getTopInstructors()
        const reviews = await this.getCustomerReviews()

        return {
            stats,
            topCategories,
            topCourses,
            topInstructors,
            reviews
        }
    }

}

export default new landingService()