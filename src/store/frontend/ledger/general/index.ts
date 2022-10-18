import { defineStore } from 'pinia'
import { API } from './const'
import { General } from '../../../base'
import { doActionWithError } from '../../../action'
import {
  GetGeneralsRequest,
  GetGeneralsResponse,
  GetIntervalGeneralsRequest,
  GetIntervalGeneralsResponse,
} from './types'

export const useFrontendGeneralStore = defineStore('frontend-general-v4', {
  state: () => ({
    Generals: {
      Generals: [] as Array<General>,
      Total: 0
    },
    IntervalGenerals: {
      IntervalGenerals: new Map<string, Array<General>>(),
      Total: 0
    }
  }),
  getters: {
    getIntervalGeneralsByKey() {
      return (intervalKey: string) => {
        const data = this.IntervalGenerals.IntervalGenerals.get(intervalKey)
        return !data? [] as Array<General> : data
      }
    },
    generals() {
      return () => this.Generals.Generals.sort((a, b) => a.Spendable > b.Spendable ? -1 : 1)
    },
    getIntervalIncoming () {
      return (intervalKey: string, coinTypeID: string) => {
        const data = this.getIntervalGeneralsByKey(intervalKey)
        let incoming = 0
        data.filter((el) => el.CoinTypeID === coinTypeID)
            .forEach((el) => incoming += Number(el.Incoming))
        return incoming
      }
    },
    getBalanceByID () {
      return (coinTypeID: string) => {
        const general = this.Generals.Generals.find((el) => el.CoinTypeID === coinTypeID)
        return !general? '0' : general.Spendable
      }
    }
  },
  actions: {
    getGenerals (req: GetGeneralsRequest, done: (generals: Array<General>, error: boolean) => void) {
      doActionWithError<GetGeneralsRequest, GetGeneralsResponse>(
        API.GET_GENERALS,
        req,
        req.Message,
        (resp: GetGeneralsResponse): void => {
          this.Generals.Generals.push(...resp.Infos)
          this.Generals.Total = resp.Total
          done(resp.Infos, false)
        },
        () => {
          done([] as Array<General>, true)
        }
      )
    },
    getIntervalGenerals (req: GetIntervalGeneralsRequest, intervalKey: string, done: (intervalGenerals: Array<General>, error: boolean) => void) {
      doActionWithError<GetIntervalGeneralsRequest, GetIntervalGeneralsResponse>(
        API.GET_INTERVALGENERALS,
        req,
        req.Message,
        (resp: GetIntervalGeneralsResponse): void => {
          const data = this.getIntervalGeneralsByKey(intervalKey)
          data.push(...resp.Infos)
          this.IntervalGenerals.IntervalGenerals.set(intervalKey, data)
          this.IntervalGenerals.Total = resp.Total
          done(data, false)
        },
        () => {
          done([] as Array<General>, true)
        }
      )
    }
  }
})