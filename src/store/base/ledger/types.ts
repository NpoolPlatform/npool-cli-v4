import { IOSubType, IOType } from './const'

export interface Detail {
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  IOType: IOType;
  IOSubType: IOSubType;
  CreatedAt: number;
  Amount: string;
  IOExtra: string;
}

export interface General {
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  Incoming: string;
  Locked: string;
  Outcoming: string;
  Spendable: string;
}