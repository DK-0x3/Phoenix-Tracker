/**
 * Пока не пригодился
 */
class CoinController {
	constructor() {

	}

	// public executeCoin = (
	// 	dispatch: AppDispatch,
	// 	state: RootState,
	// 	coinId: string
	// ) => {
	// 	const coin = getCoinById(coinId)(state);
	//
	// 	if (!coin || Date.now() - coin.lastUpdate > 5 * 60 * 1000) {
	// 		// если монеты нет или данные старше 5 минут
	// 		// dispatch(fetchCoin(coinId));
	// 	}
	//
	// 	return coin;
	// };
}

export const APICoinController = new CoinController();