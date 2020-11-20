'use strict'

import User from './../../models/interfaces/user'

export interface UersRepositoryInterface {
  countByEmail(email: string): Promise<number>

  createNewAccount(name: string, email: string): Promise<User>

  setTheNewPasswordByEmail(email: string, hashedPassword: string): Promise<void>
}

export default UersRepositoryInterface
