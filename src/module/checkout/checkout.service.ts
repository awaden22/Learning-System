
import { BadRequestException, NotFoundException } from "../../common/exceptions/domain.exception.js";
import cartRepo from "../../DB/Repo/cart.repo.js";
import courseRepo from "../../DB/Repo/course.repo.js";
import userRepo from "../../DB/Repo/user.repo.js";




class checkoutService {
  private _courseRepo = courseRepo;
  private _cartRepo = cartRepo;
  private _userRepo = userRepo

  constructor() { }

  async checkout(userId: string) {

    const user = await this._userRepo.findOne({
      filter: {
        _id: userId
      }
    })

    if (!user) {
      throw new NotFoundException("user not found")
    }

    const cart = await this._cartRepo.findOne({
      filter: {
        user_id: userId
      },
    
    })

    if (!cart || cart.course_id.length === 0) {
      throw new NotFoundException("cart is empty");
    }

  const courses = await this._courseRepo.find({
    filter:{
      _id:{$in:cart.course_id},
      isActive:true
    }
  })

  if (courses.length !== cart.course_id.length) {
  throw new BadRequestException("One or more courses are not available");
}

    const subtotal = courses.reduce((total, course) => {
      return total + course.cost;
    }, 0);

    const tax = subtotal * .15
    const total = subtotal + tax

    return {
      cart,
      subtotal,
      tax,
      total
    };


  }


}


export default new checkoutService();
