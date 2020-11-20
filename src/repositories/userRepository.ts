'use strict'

const userModel = require('./../models/userModel')
import UsersRepositoryInterface from './interfaces/userRepository'

module.exports = class UserRepository implements UsersRepositoryInterface  {
  private UserModel: any

  constructor() {
    this.UserModel = userModel
  }

  public countByEmail(email) {
    return this.UserModel.countDocuments({ email: email.toLowerCase() })
  }

  public createNewAccount(name, email) {
    return this.UserModel.create({ name, email })
  }
}
