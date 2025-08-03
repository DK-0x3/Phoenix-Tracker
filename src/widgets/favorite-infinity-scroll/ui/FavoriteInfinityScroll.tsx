import { InfiniteScroll } from '../../../shared/ui/infinite-scroll/ui/InfiniteScroll';
import { ICoin } from '../../../shared/types/ICoin';
import styles from './FavoriteInfinityScroll.module.scss';
import { MainInfinityItem } from '../../main-infinity-scroll/ui/item/MainInfinityItem';
import { useLazyGetCoinsMarketsQuery } from '../../../entities/coin-gecko/coins/api/CoinsGeckoAPI';
import { useSelector } from 'react-redux';
import { getFavoriteCoins } from '../../../entities/coin-stats/coins/model/store/FavoriteCoinsSelectors';
import { useTranslation } from 'react-i18next';

export const FavoriteInfinityScroll = () => {
	const { t } = useTranslation();
	const [triggerGetCoins] = useLazyGetCoinsMarketsQuery();

	const favorites = useSelector(getFavoriteCoins);

	const fetchCoins = async (page: number): Promise<ICoin[]> => {
		if (favorites.length === 0) {
			return [];
		}

		const result = await triggerGetCoins({ page, limit: 100, ids: favorites }).unwrap();

		return result ?? [];
	};

	return (
		<div className={styles.FavoriteInfinityScroll}>
			<InfiniteScroll<ICoin>
				fetchData={fetchCoins}
				renderItem={(coin) => <MainInfinityItem coin={coin}/> }
				keyExtractor={(coin) => coin.id}
				pageSize={100}
				endMessage={
					<div style={{ color: 'var(--dark-gray)' }}>
						{t('Избранные монеты готовы к запуску, но на этом все')}
					</div>
				}
			/>
		</div>
	);
};