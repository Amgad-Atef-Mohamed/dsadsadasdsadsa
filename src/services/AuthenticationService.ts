'use strict'

import userRepository from './../repositories/interfaces/userRepository'
import BadError from './../utilities/errors/BadError'

import  Cache from '../services/interfaces/Cache'
import Mailing from '../services/interfaces/Mailing'

export default class AuthService {
  private userRepository: userRepository
  private CacheAdapter: Cache
  private mailingAdapter: Mailing

  constructor(opts) {
    this.userRepository = opts.userRepository
    this.CacheAdapter = opts.CacheAdapter
    this.mailingAdapter = opts.mailingAdapter
  }

  public async register(payload): Promise<void> {
    const { name, email } = payload

    const numberOfUsersHaveTheEmail: number = await this.userRepository.countByEmail(email)

    if (numberOfUsersHaveTheEmail) {
      throw new BadError('Email Already Exist')
    }

    await this.userRepository.createNewAccount(name, email)

    return this.sendOTPMailToResetHisPassword(email)
  }

  public async sendOTPMailToResetHisPassword(email): Promise<void> {
    const keys: string[] = await this.CacheAdapter.searchByPattern(`${email}_OTP*`)

    if (keys.length > 0) {
      throw new BadError('Code already sent. Wait 2 minutes before resend')
    }

    const OTP: string = this.generateOTP()
    const cacheKey: string = `${email}_OTP`

    await this.mailingAdapter.sendOTPMail(email, OTP)

    return this.CacheAdapter.set(cacheKey, OTP, 120)
  }

  private generateOTP(): string {
    return (Math.floor(Math.random() * ((10 * 1000) - 1000)) + 1000).toString()
  }
}
