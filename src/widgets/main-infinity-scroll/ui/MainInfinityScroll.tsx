import { InfiniteScroll } from '../../../shared/ui/infinite-scroll/ui/InfiniteScroll';
import { ICoin } from '../../../shared/types/ICoin';
import { useLazyGetCoinsQuery } from '../../../entities/coin-stats/coins/api/CoinsStatsAPI';
import styles from './MainInfinityScroll.module.scss';
import { MainInfinityItem } from './item/MainInfinityItem';

export const MainInfinityScroll = () => {
	const [triggerGetCoins] = useLazyGetCoinsQuery();

	const fetchCoins = async (page: number): Promise<ICoin[]> => {
		const { result } = await triggerGetCoins({ page, limit: 100 }).unwrap();

		return result ?? [];
	};

	return (
		<div className={styles.MainInfinityScroll}>
			<InfiniteScroll<ICoin>
				fetchData={fetchCoins}
				renderItem={(coin) => <MainInfinityItem coin={coin}/> }
				keyExtractor={(coin) => coin.id}
				pageSize={100}
			/>
		</div>
	);
};