import { Request, Response } from 'express'
import * as Joi from 'joi'

import BaseController from './BaseController'

/**
 * @class ChatController
 * @extends BaseController
 */
export default class ChatController extends BaseController {
  private errorManagementService: any
  private chatMessagesService: any

  constructor(otps) {
    super()

    this.errorManagementService = otps.errorManagementService
    this.chatMessagesService = otps.ChatMessagesService
  }

  public applyRoutes() {
    this.router.get('/', this.listMessages.bind(this))
    this.router.post('/', this.broadcastTheMessage.bind(this))

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
  public async listMessages(req: Request, res: Response): Promise<Response> {
    try {
      const messages = await this.chatMessagesService.listTheLastTenMessages()

      return super.render(res, 200, messages)
    }
    catch (e) {
      console.log('err', e)
      this.errorManagementService.handle(res, e)
    }
  }

  /**
   * broadcast The Message handler.
   *
   * @class AuthenticationController
   * @method broadcastTheMessage
   * @public
   *
   * @param {Request} req
   * @param {Response} res
   *
   * @return {Promise<Response>}
   */
  public async broadcastTheMessage(req: Request, res: Response): Promise<Response> {
    try {
      const schema = Joi.object({
        message: Joi.string().min(1).max(3000).required(),
        name: Joi.string().min(3).max(60).required(),
      })

      const { error } = await schema.validate(req.body, { allowUnknown: false })

      if (error) {
        return super.render(res, 400, { message: error.details.map(i => i.message).join(',') })
      }
      await this.chatMessagesService.saveMessageAndBroadCast(req.body)

      return super.render(res, 200, [])
    }
    catch (e) {
      console.log('err', e)
      this.errorManagementService.handle(res, e)
    }
  }
}
