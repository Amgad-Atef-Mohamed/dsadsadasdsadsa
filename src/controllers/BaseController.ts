import { Response, Router } from 'express'

/**
 * @class BaseController
 */
export default class BaseController {
  protected router: Router

  constructor() {
    this.router = Router()
  }

  /**
   * @class BaseController
   * @method render
   * @protected
   *
   * @param {Response} res
   * @param {number} statusCode
   * @param {object} data
   *
   * @return {Response}
   */
  protected render(res: Response, statusCode: number, data?: object): Response {
    if (!data) return res.sendStatus(statusCode)

    return res.status(statusCode).send(data)
  }
}
