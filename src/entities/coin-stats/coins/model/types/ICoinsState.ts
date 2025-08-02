import { ICoin } from '../../../../../shared/types/ICoin';

export interface ICoinRefresh extends ICoin {
    lastUpdate: number;
}

export interface ICoinsState {
    coins: ICoinRefresh[];
}