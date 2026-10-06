

import { ConflictException, NotFoundException } from "../../common/exceptions/domain.exception.js";

import cartRepo from "../../DB/Repo/cart.repo.js";
import courseRepo from "../../DB/Repo/course.repo.js";
import purchaseRepo from "../../DB/Repo/purchase.repo.js";
import userRepo from "../../DB/Repo/user.repo.js";





class cartService {
  private _cartRepo = cartRepo;
  private _userRepo = userRepo;
  private _courseRepo = courseRepo;
  private _purchaseRepo = purchaseRepo;




  constructor() { }

  async addToCart(course_id:string, userId: string) {

    const user = await this._userRepo.findOne({
      filter: {
        _id: userId
      }
    });

    if (!user) {
      throw new NotFoundException("user not found");
    }


    const purchaseCourse = await this._purchaseRepo.findOne({
      filter: {
        user_id: userId,
        course_id: course_id
      }
    })

    if (purchaseCourse) {
      throw new ConflictException("course already purchased")
    }

    const course = await this._courseRepo.findOne({
      filter: {
        _id: course_id,
        isActive: true
      }
    });

    if (!course) {
      throw new NotFoundException("course not found");
    }

    let cart = await this._cartRepo.findOne({
      filter: {
        user_id: userId
      }
    });

    if (!cart) {

      const createdCart = await this._cartRepo.create({
        data: {
          user_id: userId,
          course_id: [course_id]
        }
      });
      cart = Array.isArray(createdCart) ? createdCart[0] ?? null : createdCart;

    } else {

      if (cart.course_id.some(
        id => id.toString() === course_id.toString()
      )) {
        throw new ConflictException("course already exists in cart");
      }

      await this._cartRepo.updateOne({
        filter: {
          user_id: userId
        },
        update: {
          $push: {
            course_id: course_id
          }
        }
      });
    }
    cart = await this._cartRepo.findOne({
      filter: {
        user_id: userId
      }
    });

    return cart;
  }


  async removeFromCart(userId: string, course_id: string,) {

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

      }
    })
    if (!cart) {
      throw new NotFoundException("cart not found")
    }

    const courseExists = cart.course_id.some(
      (id) => id.toString() === course_id.toString()
    );

    if (!courseExists) {
      throw new NotFoundException("course not found in cart");
    }


    cart.course_id = cart.course_id.filter((id) => id.toString() !== course_id.toString())

    await cart.save()

    const newCart = await this._cartRepo.findOne({
      filter: {
        user_id: userId
      }
    })
    return newCart

  }

  async clearCart(userId: string) {

    const user = await this._cartRepo.findOne({
      filter: {
        user_id: userId
      }
    })

    if (!user) {
      throw new NotFoundException("user not found")
    }




    await this._cartRepo.updateOne({
      filter: {
        user_id: userId
      },
      update: {
        course_id: []
      }
    })
    return {
      message: "cart cleared successfully"
    }
  }

  async getCart(userId: string) {

    const cart = await this._cartRepo.findOne({
      filter: {
        user_id: userId
      },
      options: {
        populate: {
          path: "course_id"
        }
      }
    })

    if (!cart) {
      throw new NotFoundException("cart not found")
    }

    const subtotal = (cart.course_id as any[]).reduce((total, course) => {
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


export default new cartService();
