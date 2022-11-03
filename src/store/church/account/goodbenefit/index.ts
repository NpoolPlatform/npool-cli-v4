import { doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { PlatformAccount } from '../../../base'
import { 
  GetGoodBenefitAccountsRequest,
  GetGoodBenefitAccountsResponse,
  CreateGoodBenefitAccountRequest,
  CreateGoodBenefitAccountResponse,
  UpdateGoodBenefitAccountRequest,
  UpdateGoodBenefitAccountResponse,
} from './types'

export const useChurchGoodBenefitAccountStore = defineStore('church-goodbenefitaccount-v4', {
  state: () => ({
    GoodBenefitAccounts: {
      GoodBenefitAccounts:  [] as Array<PlatformAccount>,
      Total: 0
    }
  }),
  getters: {},
  actions: {
    getGoodBenefitAccounts(req: GetGoodBenefitAccountsRequest, done: (gbAccounts: Array<PlatformAccount>, error: boolean) => void) {
      doActionWithError<GetGoodBenefitAccountsRequest, GetGoodBenefitAccountsResponse>(
        API.GET_GOODBENEFITACCOUNTS,
        req,
        req.Message,
        (resp: GetGoodBenefitAccountsResponse): void => {
          this.GoodBenefitAccounts.GoodBenefitAccounts.push(...resp.Infos)
          this.GoodBenefitAccounts.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    },
    updateGoodBenefitAccounts(req: UpdateGoodBenefitAccountRequest, done: (gbAccount: PlatformAccount, error: boolean) => void) {
      doActionWithError<UpdateGoodBenefitAccountRequest, UpdateGoodBenefitAccountResponse>(
        API.UPDATE_GOODBENEFITACCOUNT,
        req,
        req.Message,
        (resp: UpdateGoodBenefitAccountResponse): void => {
          const index = this.GoodBenefitAccounts.GoodBenefitAccounts.findIndex((el) => el.ID === resp.Info.ID)
          this.GoodBenefitAccounts.GoodBenefitAccounts.splice(index, 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as PlatformAccount, true)
      })
    },
    createGoodBenefitAccounts(req: CreateGoodBenefitAccountRequest, done: (gbAccount: PlatformAccount, error: boolean) => void) {
      doActionWithError<CreateGoodBenefitAccountRequest, CreateGoodBenefitAccountResponse>(
        API.CREATE_GOODBENEFITACCOUNT,
        req,
        req.Message,
        (resp: CreateGoodBenefitAccountResponse): void => {
          this.GoodBenefitAccounts.GoodBenefitAccounts.splice(0, 0, resp.Info)
          this.GoodBenefitAccounts.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as PlatformAccount, true)
      })
    }
  }
})
