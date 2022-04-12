import { defineStore } from 'pinia'
import { NotSet } from '../../../const'
import { doAction } from '../../action'
import { API } from './const'
import {
  Coin,
  CoinState,
  Description,
  GetCoinsRequest,
  GetCoinsResponse,
  GetDescriptionRequest,
  GetDescriptionResponse
} from './types'

export const useCoinStore = defineStore('coin', {
  state: (): CoinState => ({
    Coins: [],
    Descriptions: new Map<string, Map<string, Description>>(),
    Currencies: new Map<string, Map<string, number>>()
  }),
  getters: {
    getCoinLogo (): (coin: Coin) => string {
      return (coin: Coin): string => {
        if (coin && coin.Logo.length > 0 && coin.Logo !== NotSet) {
          return coin.Logo
        }
        return 'icons/Logo.svg'
      }
    },
    getCoinByID (): (id: string) => Coin {
      return (id: string): Coin => {
        for (const coin of this.Coins) {
          if (id === coin.ID) {
            return coin
          }
        }
        return undefined as unknown as Coin
      }
    },
    getCoinDescriptionByCoinUsedFor (): (id: string, usedFor: string) => Description {
      return (id: string, usedFor: string): Description => {
        const descriptions = this.Descriptions.get(id)
        if (!descriptions) {
          return undefined as unknown as Description
        }
        return descriptions.get(usedFor) as Description
      }
    }
  },
  actions: {
    getCoins (req: GetCoinsRequest, done: () => void) {
      doAction<GetCoinsRequest, GetCoinsResponse>(
        API.GET_COINS,
        req,
        req.Message,
        (resp: GetCoinsResponse): void => {
          this.Coins = resp.Infos
          done()
        })
    },
    getCoinDescription (req: GetDescriptionRequest) {
      doAction<GetDescriptionRequest, GetDescriptionResponse>(
        API.GET_DESCRIPTION,
        req,
        req.Message,
        (resp: GetDescriptionResponse): void => {
          let descriptions = this.Descriptions.get(resp.Info.CoinTypeID)
          if (!descriptions) {
            descriptions = new Map<string, Description>()
          }
          descriptions.set(resp.Info.UsedFor, resp.Info)
          this.Descriptions.set(resp.Info.CoinTypeID, descriptions)
        })
    }
  }
})

export * from './types'
