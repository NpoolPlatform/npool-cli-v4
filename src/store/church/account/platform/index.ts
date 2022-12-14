import { doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { AccountUsedFor, PlatformAccount } from '../../../base'
import { 
  GetPlatformAccountsRequest,
  GetPlatformAccountsResponse,
  CreatePlatformAccountRequest,
  CreatePlatformAccountResponse,
  UpdatePlatformAccountRequest,
  UpdatePlatformAccountResponse,
} from './types'

export const useChurchPlatformAccountStore = defineStore('church-platformaccount-v4', {
  state: () => ({
    PlatformAccounts: {
      PlatformAccounts:  [] as Array<PlatformAccount>,
      Total: 0
    }
  }),
  getters: {
    getAccountsByKey() {
      return (key: AccountUsedFor) => this.PlatformAccounts.PlatformAccounts.filter((el) => el.UsedFor === key)
    }
  },
  actions: {
    getPlatformAccounts(req: GetPlatformAccountsRequest, done: (accounts: Array<PlatformAccount>, error: boolean) => void) {
      doActionWithError<GetPlatformAccountsRequest, GetPlatformAccountsResponse>(
        API.GET_PLATFORMACCOUNTS,
        req,
        req.Message,
        (resp: GetPlatformAccountsResponse): void => {
          this.PlatformAccounts.PlatformAccounts.push(...resp.Infos)
          this.PlatformAccounts.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    },
    updatePlatformAccount(req: UpdatePlatformAccountRequest, done: (account: PlatformAccount, error: boolean) => void) {
      doActionWithError<UpdatePlatformAccountRequest, UpdatePlatformAccountResponse>(
        API.UPDATE_PLATFORMACCOUNT,
        req,
        req.Message,
        (resp: UpdatePlatformAccountResponse): void => {
          const index = this.PlatformAccounts.PlatformAccounts.findIndex((el) => el.ID === resp.Info.ID)
          this.PlatformAccounts.PlatformAccounts.splice(index, 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as PlatformAccount, true)
      })
    },
    createPlatformAccount(req: CreatePlatformAccountRequest, done: (account: PlatformAccount, error: boolean) => void) {
      doActionWithError<CreatePlatformAccountRequest, CreatePlatformAccountResponse>(
        API.CREATE_PLATFORMACCOUNT,
        req,
        req.Message,
        (resp: CreatePlatformAccountResponse): void => {
          const index =  this.PlatformAccounts.PlatformAccounts.findIndex((el) => el.ID === resp.Info.ID)
          this.PlatformAccounts.PlatformAccounts.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as PlatformAccount, true)
      })
    }
  }
})
