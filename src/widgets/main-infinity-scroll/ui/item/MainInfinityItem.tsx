import styles from './MainInfinityItem.module.scss';
import { ICoin } from '../../../../shared/types/ICoin';
import { PercentageColor } from '../../../../shared/ui/percentage-color/PercentageColor';
import StarSVG from '../../../../shared/assets/svg/star.svg';
import { IconCoin } from '../../../../shared/ui/icon-coin/ui/IconCoin';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import {
	addFavoriteCoin,
	deleteFavoriteCoin
} from '../../../../entities/coin-stats/coins/model/store/FavoriteCoinsSlice';
import { useSelector } from 'react-redux';
import { getFavoriteCoins } from '../../../../entities/coin-stats/coins/model/store/FavoriteCoinsSelectors';
import React, { useState } from 'react';
import Utils from '../../../../shared/lib/utils/Utils';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../../app/rout/routes';

export interface IMainInfinityItemProps {
	coin: ICoin;
}

export const MainInfinityItem = (props: IMainInfinityItemProps) => {
	const { coin } = props;

	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const favorites = useSelector(getFavoriteCoins);

	const [isFavorite, setIsFavorite] = useState(favorites.includes(coin.id));

	const marketCap = Utils.Number.formatBigNumber(coin.marketCap);
	const volume = Utils.Number.formatBigNumber(coin.volume);
	const usedEmission = Utils.Number.formatBigNumber(coin.availableSupply);

	const onFavoriteClick = (ev: React.MouseEvent<HTMLDivElement>) => {
		ev.stopPropagation();
        
		if (favorites.includes(coin.id)) {
			setIsFavorite(false);
			dispatch(deleteFavoriteCoin(coin.id));
			return;
		}

		setIsFavorite(true);
		dispatch(addFavoriteCoin(coin.id));
	};

	const handleCoinClick = () => {
		navigate(`${ROUTES.COIN}/${coin.id}`);
	};

	return (
		<div className={styles.MainInfinityItem} onClick={handleCoinClick}>
			<div>
				{coin.rank}
			</div>

			<IconCoin className={styles.Icon} src={coin.icon}/>

			<div>
				<span className={styles.Name}>{coin.name}</span>
				<span className={styles.Symbol}>  {coin.symbol.toUpperCase()}</span>
			</div>

			<div className={styles.Price}>
				$ {Utils.Number.formatPrice(coin.price)}
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