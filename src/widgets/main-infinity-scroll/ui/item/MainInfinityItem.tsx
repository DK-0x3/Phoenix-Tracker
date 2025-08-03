import styles from './MainInfinityItem.module.scss';
import { ICoin } from '../../../../shared/types/ICoin';
import { CorrectPrice } from '../../../../features/number/CorrectPrice';
import { PercentageColor } from '../../../../shared/ui/percentage-color/PercentageColor';
import { CorrectBigNumber } from '../../../../features/number/CorrectBigNumber';
import StarSVG from '../../../../shared/assets/svg/star.svg';
import { IconCoin } from '../../../../shared/ui/icon-coin/ui/IconCoin';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import {
	addFavoriteCoin,
	deleteFavoriteCoin
} from '../../../../entities/coin-stats/coins/model/store/FavoriteCoinsSlice';
import { useSelector } from 'react-redux';
import { getFavoriteCoins } from '../../../../entities/coin-stats/coins/model/store/FavoriteCoinsSelectors';
import { useState } from 'react';

export interface IMainInfinityItemProps {
	coin: ICoin;
}

export const MainInfinityItem = (props: IMainInfinityItemProps) => {
	const { coin } = props;

	const dispatch = useAppDispatch();
	const favorites = useSelector(getFavoriteCoins);

	const [isFavorite, setIsFavorite] = useState(favorites.includes(coin.id));

	const marketCap = CorrectBigNumber(coin.marketCap);
	const volume = CorrectBigNumber(coin.volume);
	const usedEmission = CorrectBigNumber(coin.availableSupply);

	const onFavoriteClick = () => {
		if (favorites.includes(coin.id)) {
			setIsFavorite(false);
			dispatch(deleteFavoriteCoin(coin.id));
			return;
		}

		setIsFavorite(true);
		dispatch(addFavoriteCoin(coin.id));
	};

	return (
		<div className={styles.MainInfinityItem}>
			<div>
				{coin.rank}
			</div>

			<IconCoin className={styles.Icon} src={coin.icon}/>

			<div>
				<span className={styles.Name}>{coin.name}</span>
				<span className={styles.Symbol}>  {coin.symbol.toUpperCase()}</span>
			</div>

			<div className={styles.Price}>
				$ {CorrectPrice(coin.price)}
			</div>

			<PercentageColor percent={coin.priceChange1h}/>
			<PercentageColor percent={coin.priceChange1d}/>
			<PercentageColor percent={coin.priceChange1w}/>

			<div className={styles.MarketCap}>
				{marketCap.number} {marketCap.symbol}
			</div>

			<div className={styles.Volume}>
				{volume.number} {volume.symbol}
			</div>

			<div>
				{usedEmission.number} {usedEmission.symbol}
			</div>

			<div className={styles.Star} onClick={onFavoriteClick}>
				<StarSVG style={{ fill: isFavorite ? 'var(--orange)' : 'var(--dark-gray)' }}/>
			</div>

		</div>
	);
};