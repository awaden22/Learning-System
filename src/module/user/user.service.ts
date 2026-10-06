

import type { JwtPayload } from "jsonwebtoken";
import type { Types } from "mongoose";
import userRepo from "../../DB/Repo/user.repo.js";
import redisServices from "../../DB/Models/Redis/redis.services.js";
import s3BuketService from "../../common/S3Buket/s3.buket.service.js";
import notificationService from "../../common/Notification/notification.service.js";
import chatRepo from "../../DB/Repo/chat.repo.js";
import type { UpdateProfileUserDto, uploadProfileDto } from "./user.dto.js";
import type { IHUser } from "../../DB/Models/user.Models.js";
import { BadRequestException, NotFoundException } from "../../common/exceptions/domain.exception.js";
import { ChatType } from "../../common/enums/chat.enums.js";
import { ENYCRPTION_KEY } from "../../config/config.service.js";
import { encrptionData } from "../../common/security/encryption.js";



class UserService {
  constructor() { }
  private _userRepo = userRepo;
  private _redisMethods = redisServices;
  private _S3BuketService = s3BuketService;
  private _notification = notificationService;
  private _chatRepo = chatRepo
  async logout(
    userId: string | Types.ObjectId,
    Tokendata: JwtPayload,
    logoutOptions: string,
  ) {
    if (logoutOptions == "all") {
      await this._userRepo.updateOne({
        filter: { _id: userId },
        update: { changeCreditTime: Date.now() },
      });
    }
    await this._redisMethods.set(
      this._redisMethods.blockListTokenId(userId as string, Tokendata.jti!),
      String(Tokendata.jti),
      60 * 60 * 24 * 365 - (Date.now() / 1000 - Tokendata.iat!),
    );
    await this._redisMethods.removeActiveUser(userId as string)
  }


 
  async getUser(user: IHUser) {
    await user.populate({
      path: "friends"
    })

    const groups = await this._chatRepo.find({
      filter: {
        participants: { $in: [user._id] },
        type: ChatType.OVM
      }
    })

    return { user, groups }
  }
  async getUserById(userId: string) {
    const result = await this._userRepo.findById({
      id: userId
    })
    if (!result) {
      throw new NotFoundException("User not found");
    }
    return result
  }

  async updateUser(data: UpdateProfileUserDto, user: IHUser) {



 


    const updateUser = await this._userRepo.updateOne({
      filter: {
        _id: user._id
      },
      update: {
        ...data
      }
    })
    if (updateUser.modifiedCount === 0) {
      throw new BadRequestException("No changes detected");
    }
    return updateUser
  }
  async serachUser(search: string) {
    const result = await this._userRepo.find({
      filter: {
        userName: {
          $regex: search,
          $options: "i"
        }

      },

    })
    return result
  }
  

 

}
export default new UserService();
