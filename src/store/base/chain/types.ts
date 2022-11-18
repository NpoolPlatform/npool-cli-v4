import { AccountUsedFor } from '../account';

export interface AppCoin {
  ID: string;
  AppID: string;
  CoinTypeID: string;
  Name: string;
  Logo: string;
  Unit: string;
  Presale: boolean;
  ReservedAmount: string;
  ForPay: boolean;
  Product_Page: boolean;
  ENV: string;
  HomePage: string;
  Specs: string;
  FeeCoinTypeID: string;
  FeeCoinName: string;
  FeeCoinLogo: string;
  FeeCoinUnit: string;
  FeeCoinENV: string;
  WithdrawFeeByStableUSD: boolean;
  WithdrawFeeAmount: string;
  CollectFeeAmount: string;
  HotWalletFeeAmount: string;
  LowFeeAmount: string;
  HotWalletAccountAmount: string;
  PaymentAccountCollectAmount: string;
  WithdrawAutoReviewAmount: string;
  MarketValue: string;
  SettleValue: string;
  SettlePercent: number;
  Setter: string;
  CreatedAt: number;
  UpdatedAt: number;
}

export interface Coin {
  ID: string;
  Name: string;
  Logo: string;
  Presale: boolean;
  ReservedAmount: string;
  Unit: string;
  ENV: string;
  ForPay: boolean;
  HomePage: string;
  Specs: string;
  FeeCoinTypeID: string;
  FeeCoinName: string;
  FeeCoinLogo: string;
  FeeCoinUnit: string;
  FeeCoinENV: string;
  WithdrawFeeByStableUSD: boolean;
  WithdrawFeeAmount: string;
  CollectFeeAmount: string;
  HotWalletFeeAmount: string;
  LowFeeAmount: string;
  HotWalletAccountAmount: string;
  PaymentAccountCollectAmount: string;
  CreatedAt: number;
  UpdatedAt: number;
}

export enum CoinUsedFor {
  DefaultUsedFor = "DefaultUsedFor",
  ProductPage = "ProductPage",
}

export interface CoinDescription {
  ID: string;
  AppID: string;
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  CoinENV: string;
  UsedForStr: string;
  UsedFor: CoinUsedFor;
  Title: string;
  Message: string;
  CreatedAt: number;
  UpdatedAt: number;
}

/** @default "DefaultTxState" */
export enum TxState {
  DefaultTxState = "DefaultTxState",
  StateCreated = "StateCreated",
  StateWait = "StateWait",
  StateTransferring = "StateTransferring",
  StateSuccessful = "StateSuccessful",
  StateFail = "StateFail",
}

/** @default "DefaultTxType" */
export enum TxType {
  DefaultTxType = "DefaultTxType",
  TxWithdraw = "TxWithdraw",
  TxFeedGas = "TxFeedGas",
  TxPaymentCollect = "TxPaymentCollect",
  TxBenefit = "TxBenefit",
}

export interface Tx {
  ID: string;
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  CoinENV: string;
  AppID: string;
  AppName: string;
  FromAccountID: string;
  FromAddress: string;
  FromUsedFor: AccountUsedFor;
  ToAccountID: string;
  ToAddress: string;
  ToUsedFor: AccountUsedFor;
  Amount: string;
  FeeAmount: string;
  ChainTxID: string;
  State: TxState;
  Extra: string;
  Type: TxType;
  CreatedAt: number;
  UpdatedAt: number;
}