import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('/:id', this.editProfile)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editProfile(req, res, next) {
    try {
      req.body.id = req.userInfo.id
      const updated = await accountService.updateAccount(req.body)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }
}
