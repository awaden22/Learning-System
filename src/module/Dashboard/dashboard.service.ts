import courseRepo from "../../DB/Repo/course.repo.js";
import categoryRepo from "../../DB/Repo/category.repo.js";
import instructorRepo from "../../DB/Repo/instructor.repo.js";
import purchaseRepo from "../../DB/Repo/purchase.repo.js";

class DashboardService {

  private _courseRepo = courseRepo;
  private _categoryRepo = categoryRepo;
  private _instructorRepo = instructorRepo;
  private _purchaseRepo = purchaseRepo;

  constructor() {}

  async getDashboard() {

    const coursesCount = await this._courseRepo.allCount({
      isActive: true
    });

    const categoriesCount = await this._categoryRepo.allCount({
      isActive: true
    });

    const instructorsCount = await this._instructorRepo.allCount({
      isActive: true
    });

    const now = new Date();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const startOfNextMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    );

    const monthlySubscriptions = await this._purchaseRepo.aggregate([
      {
        $match: {
          purchasedAt: {
            $gte: startOfMonth,
            $lt: startOfNextMonth
          }
        }
      },
      {
        $group: {
          _id: null,
          subscriptions: {
            $sum: 1
          }
        }
      },
      {
        $project: {
          _id: 0,
          subscriptions: 1
        }
      }
    ]);

    return {
      coursesCount,
      categoriesCount,
      instructorsCount,
      monthlySubscriptions: monthlySubscriptions[0]?.subscriptions ?? 0
    };
  }
}

export default new DashboardService();