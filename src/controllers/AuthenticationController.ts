'use strict'

import { Request, Response } from 'express'
import * as Joi from 'Joi'
import * as config from 'config'
import BaseController from './BaseController'

/**
 * @class AuthenticationController
 * @extends BaseController
 */
export default class AuthenticationController extends BaseController {
  private authenticationService: any
  private errorManagementService: any

  constructor(otps) {
    super()

    this.authenticationService = otps.authenticationService
    this.errorManagementService = otps.errorManagementService
  }

  public applyRoutes() {
    this.router.post('/register', this.register.bind(this))
    this.router.patch('/password', this.setPassword.bind(this))
    this.router.post('/login', this.login.bind(this))
    this.router.post('/logout', this.logout.bind(this))

    return this.router
  }

  /**
   * register handler.
   *
   * @class AuthenticationController
   * @method register
   * @public
   *
   * @param {Request} req
   * @param {Response} res
   *
   * @return {Promise<Response>}
   */
  public async register(req: Request, res: Response): Promise<Response> {
    try {
      // TODO validation layer.
      const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().min(3).max(60).required(),
      })

      const { error } = await schema.validate(req.body, { allowUnknown: false })

      if (error) {
        return super.render(res, 400, { message: error.details.map(i => i.message).join(',') })
      }

      await this.authenticationService.register(req.body)

      return super.render(res, 201)
    }
    catch (e) {
      console.log('err', e)
      this.errorManagementService.handle(res, e)
    }
  }

  /**
   * set user Password handler.
   *
   * @class AuthenticationController
   * @method setPassword
   * @public
   *
   * @param {Request} req
   * @param {Response} res
   *
   * @return {Promise<Response>}
   */
  public async setPassword(req: Request, res: Response): Promise<Response> {
    try {
      // TODO validation layer.
      const schema = Joi.object({
        OTP: Joi.string().min(4).max(4).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(64).required(),
        confirmationPassword: Joi.ref('password'),
      })

      const {error} = await schema.validate(req.body, { allowUnknown: false })

      if (error) {
        return super.render(res, 400, { message: error.details.map(i => i.message).join(',') })
      }

      await this.authenticationService.setNewPassword(req.body)

      return super.render(res, 201)
    }
    catch (e) {
      console.log('err', e)
      this.errorManagementService.handle(res, e)
    }
  }
  /**
   * login handler.
   *
   * @class AuthenticationController
   * @method login
   * @public
   *
   * @param {Request} req
   * @param {Response} res
   *
   * @return {Promise<Response>}
   */
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      // TODO validation layer.
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(64).required(),
      })

      const { error } = await schema.validate(req.body, { allowUnknown: false })

      if (error) {
        console.log('error', error.details)
        return super.render(res, 400, { message: error.details.map(i => i.message).join(',') })
      }

      const {token, user } = await this.authenticationService.login(req.body)
      // TODO set token in cookie or in set in response object based on user-agent.

      res.cookie('token', token, {
        domain: '127.0.0.1',
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/',
        maxAge: config.get('JWT.TTL'),
      })

      return super.render(res, 200, { user })
    }
    catch (e) {
      console.log('err', e)
      this.errorManagementService.handle(res, e)
    }
  }

  /**
   * logout handler.
   *
   * @class AuthenticationController
   * @method logout
   * @public
   *
   * @param {Request} req
   * @param {Response} res
   *
   * @return {Promise<Response>}
   */
  public async logout(req: Request, res: Response): Promise<Response> {
    try {
      // TODO GET TOKEN from express request object.
      await this.authenticationService.logout(req.cookies.token)

      res.clearCookie('token')

      return super.render(res, 201 )
    }
    catch (e) {
      console.log('err', e)
      this.errorManagementService.handle(res, e)
    }
  }


}
