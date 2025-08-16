const ROUTES = {
	HOME: '/',
	NOT_FOUND: '*',
	FAVORITES: '/favorites',
	COIN: '/coin',
};

export type ICoinParam = {
    CoinId: string;
}

export interface IRoutesParams {
    COIN: ICoinParam;
}

export const ROUTES_PARAMS: IRoutesParams = {
	COIN: {
		CoinId: 'CoinId',
	},
};

export default ROUTES;