import { Coin } from '../../../base'
import { BaseRequest } from '../../../base';

export interface GetCoinsRequest extends BaseRequest{
  Offset: number;
  Limit: number;
}

export interface GetCoinsResponse {
  Infos: Coin[];
  Total: number;
}

export interface UpdateCoinRequest extends BaseRequest {
  ID: string;
  Presale: boolean;
  ReservedAmount: string;
  ForPay: boolean;
  HomePage: string;
  Specs: string;
  FeeCoinTypeID: string;
  WithdrawFeeByStableUSD: boolean;
  WithdrawFeeAmount: string;
  CollectFeeAmount: string;
  HotWalletFeeAmount: string;
  LowFeeAmount: string;
  HotWalletAccountAmount: string;
  PaymentAccountCollectAmount: string;
  LeastTransferAmount?: string;
  Env?: string;
}

export interface UpdateCoinResponse {
  Info: Coin;
}