import { doAction } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { GetAppRequest, GetAppResponse } from './types'
import { App } from '../../../base'
export const useFrontendAppStore = defineStore('frontend-app-v4', {
  state: () => ({
    App: undefined as unknown as App
  }),
  getters: {},
  actions: {
    getApp (req: GetAppRequest, done: () => void) {
      doAction<GetAppRequest, GetAppResponse>(
        API.GET_APPLICATION,
        req,
        req.Message,
        (resp: GetAppResponse): void => {
          this.App = resp.Info
          done()
        })
    }
  }
})
