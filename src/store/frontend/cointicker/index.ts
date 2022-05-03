import { defineStore } from 'pinia'
import { doGet } from '../../action'
import { API } from './const'
import {
  CoinTickerState,
  ETHGas,
  GetETHGasRequest,
  GetTickersRequest,
  Ticker
} from './types'

export const useCoinTickerStore = defineStore('cointicker', {
  state: (): CoinTickerState => ({
    Tickers: new Map<string, Ticker>(),
    ETHGas: {
      fast: 0,
      fastest: 0,
      safeLow: 0,
      average: 0
    }
  }),
  getters: {
    getTickerByCoinName (): (coinName: string) => Ticker {
      return (coinName: string) => {
        return this.Tickers.get(coinName) as Ticker
      }
    }
  },
  actions: {
    getCoinTickers (req: GetTickersRequest, done: () => void) {
      const url = API.GET_TICKER + '?assets=' + req.CoinNames.join(',')
      doGet<GetTickersRequest, Map<string, Ticker>>(
        url,
        req,
        req.Message,
        (resp: Map<string, Ticker>): void => {
          for (const [k, v] of resp) {
            this.Tickers.set(k, v)
          }
          done()
        })
    },
    getETHGas (req: GetETHGasRequest, done: () => void) {
      doGet<GetETHGasRequest, ETHGas>(
        API.GET_ETH_GAS,
        req,
        req.Message,
        (resp: ETHGas): void => {
          this.ETHGas = resp
          done()
        })
    }
  }
})

export * from './types'
