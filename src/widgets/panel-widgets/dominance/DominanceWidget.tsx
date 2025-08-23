import styles from './DominanceWidget.module.scss';
import { GlobalGeckoAPI } from '../../../entities/coin-gecko/global/api/GlobalGeckoAPI';
import { CoinsStatsAPI } from '../../../entities/coin-stats/coins/api/CoinsStatsAPI';
import { Skeleton } from '../../../shared/ui/skeleton/Skeleton';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

/**
 * DominanceWidget — виджет отображения доминации криптовалют
 *
 * Компонент загружает данные о рынке через RTK Query:
 * - глобальную статистику (CoinGecko)
 * - список монет (CoinStats)
 *
 * Отображает топ‑3 монеты с их долями рынка и долю "OTHERS" (остальные).
 * При наведении на виджет происходит плавная смена текста:
 * - вместо процентов показываются символы монет (например, BTC, ETH, BNB) и "OTHERS"
 */
export const DominanceWidget = () => {
	const { t } = useTranslation();

	const { data: globalData, error: globalError, isLoading: globalIsLoading } =
        GlobalGeckoAPI.endpoints.getGlobalDataCoins.useQuery();

	const { data: coinsData, error: coinsError, isLoading: coinsIsLoading } =
        CoinsStatsAPI.endpoints.getCoins.useQuery();

	const [hovered, setHovered] = useState(false);

	if (globalIsLoading || coinsIsLoading) {
		return <Skeleton
			baseColor='#2b2b39'
		/>;
	}

	if ((globalError || coinsError) || (!globalData || !coinsData)) {
		return <div>{t('Ошибка загрузки')}</div>;
	}

	const topFourCoins = coinsData.result.slice(0, 4);
	const topFourPercent = Object.entries(globalData.data.market_cap_percentage)
		.slice(0, 3)
		.map(([, value]) => value);
	topFourPercent.push(100 - topFourPercent.reduce((a, b) => a + b, 0));

	const renderItem = (
		percent: number,
		symbol: string,
		className: string,
		isOthers = false
	) => (
		<div className={`${styles.TopItem} ${className}`}>
			<span className={`${styles.Value} ${!hovered ? styles.Visible : ''}`}>
				{percent.toFixed(2)} %
			</span>
			<span className={`${styles.Value} ${hovered ? styles.Visible : ''}`}>
				{isOthers ? 'OTHERS' : symbol.toUpperCase()}
			</span>
		</div>
	);

	return (
		<div
			className={styles.DominanceWidget}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className={styles.DominanceWidgetOverlay}>
				<img className={styles.ImgTop1} src={topFourCoins[0].icon} alt='logo'/>
				<img className={styles.ImgTop2} src={topFourCoins[1].icon} alt='logo'/>
				<img className={styles.ImgTop3} src={topFourCoins[2].icon} alt='logo'/>
				<div className={styles.ImgTop4}>
				</div>
			</div>

			<div className={styles.DominanceWidgetContent}>
				<div className={styles.Title}>
					{t('Доминация')}
				</div>
				{renderItem(topFourPercent[0], topFourCoins[0].symbol, styles.Top1)}
				{renderItem(topFourPercent[1], topFourCoins[1].symbol, styles.Top2)}
				{renderItem(topFourPercent[2], topFourCoins[2].symbol, styles.Top3)}
				{renderItem(topFourPercent[3], '', styles.Top4, true)}
			</div>
		</div>
	);
};