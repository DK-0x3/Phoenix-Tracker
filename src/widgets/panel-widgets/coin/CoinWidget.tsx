import styles from './CoinWidget.module.scss';
import { useGetCoinByIdQuery } from '../../../entities/coin-stats/coins/api/CoinsStatsAPI';
import { Skeleton } from '../../../shared/ui/skeleton/Skeleton';
import { useTranslation } from 'react-i18next';
import { PercentageColor } from '../../../shared/ui/percentage-color/PercentageColor';
import Utils from '../../../shared/lib/utils/Utils';

export interface ICoinWidgetProps {
	coinId: string;
}

/**
 * CoinWidget — виджет отображения информации о конкретной криптовалюте.
 *
 * Принимает coinId (строка) — идентификатор монеты для загрузки данных.
 * Использует RTK Query (useGetCoinByIdQuery) для получения актуальной информации.
 */
export const CoinWidget = (props: ICoinWidgetProps) => {
	const { coinId } = props;
	const { t } = useTranslation();

	const { data, error, isLoading } = useGetCoinByIdQuery(coinId, {
		pollingInterval: Utils.Time.minutesToMs(5),
	});

	if (isLoading || !data) {
		return (
			<Skeleton
				baseColor='#2b2b39'
				borderRadius={12}
			/>
		);
	}

	if (!data && error) {
		return <div>{t('Ошибка загрузки')}</div>;
	}

	const volume = Utils.Number.formatBigNumber(data.volume);
	const marketCap = Utils.Number.formatBigNumber(data.marketCap);

	return (
		<div className={styles.CoinWidgetContainer}>
			<div className={styles.Overlay}>
				<img src={data.icon} alt='logo'/>
			</div>

			<div className={styles.CoinWidget}>
				<div className={styles.SymbolAndPercent}>
					<div className={styles.Symbol}>
						{data.symbol}
					</div>
					<PercentageColor className={styles.Percent} percent={data.priceChange1d}/>
				</div>
				<div className={styles.LogoAndPriceAndGraph}>
					<div className={styles.Logo}>
						<img src={data.icon} alt='logo'/>
					</div>
					<div className={styles.Price}>
						{Utils.Number.formatPrice(data.price)} $
					</div>
				</div>
				<div className={styles.Volume}>
					<span>{t('Объем 24ч')}</span>
					<span>{volume.number} {volume.symbol}</span>
				</div>
				<div className={styles.MarketCap}>
					<span>{t('Рыночная кап.')}</span>
					<span>{marketCap.number} {marketCap.symbol}</span>
				</div>
			</div>
		</div>
	);
};