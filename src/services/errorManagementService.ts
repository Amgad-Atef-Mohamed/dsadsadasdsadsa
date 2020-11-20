import { Response } from 'express'

/**
 * @class ErrorManagement
 */
export default class ErrorManagement {
  /**
   * @class errorManagement
   * @method UnauthorizedError
   * @protected
   *
   * @param {Response} res
   *
   * @return {Response}
   */
  private UnauthorizedError(res: Response, message) {
    return res.status(401).json({ message })
  }

  /**
   * @class errorManagement
   * @method BadError
   * @protected
   *
   * @param {Response} res
   * @param {object} errorMessage
   *
   * @return {Response}
   */
  private BadError(res: Response, errorMessage) {
    return res.status(400).json( { message: errorMessage })
  }

  /**
   * @class errorManagement
   * @method ForbiddenError
   * @protected
   *
   * @param {Response} res
   *
   * @return {Response}
   */
  private ForbiddenError(res: Response) {
    return res.status(403).json({ message: 'Opps, You can not do this action' })
  }

  /**
   * @class errorManagement
   * @method NotFoundError
   * @protected
   *
   * @param {Response} res
   *
   * @return {Response}
   */
  private NotFoundError(res: Response) {
    return res.status(404).json({ message: 'Opps, the request resource not found' })
  }

  private UnExpectedError(res: Response) {
    return res.status(500).json({ message: 'Opps, Something Goes Wrong' })
  }

  /**
   * @class errorManagement
   * @method unExpectError
   * @public
   *
   * @param {Response} res
   * @param {object} error
   *
   * @return {Response}
   */
  public handle(res: Response, error): Response {
    if (error.status === 401) {
      return this.UnauthorizedError(res, error.message)
    }

    if (error.status === 400) {
      return this.BadError(res, error.message)
    }

    if (error.status === 403) {
      return this.ForbiddenError(res)
    }

    if (error.status === 404) {
      return this.NotFoundError(res)
    }

    if (error.status === 500) {
      return this.UnExpectedError(res)
    }

    return res.status(500).json( { message: 'Opps, Something Goes Wrong' })
  }
}
