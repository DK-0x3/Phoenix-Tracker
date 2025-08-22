import styles from './CoinPage.module.scss';
import { Navigate, useParams } from 'react-router-dom';
import ROUTES, { ICoinParam } from '../../app/rout/routes';
import { CoinsStatsAPI } from '../../entities/coin-stats/coins/api/CoinsStatsAPI';
import { Skeleton } from '../../shared/ui/skeleton/Skeleton';
import { useTranslation } from 'react-i18next';
import Utils from '../../shared/lib/utils/Utils';
import { PercentageColor } from '../../shared/ui/percentage-color/PercentageColor';
import InfoIcon from '../../shared/assets/svg/info.svg';
import { CoinLineChart } from '../../shared/ui/line-chart/CoinLineChart';

export const CoinPage = () => {
	const { CoinId } = useParams<ICoinParam>();
	const { t } = useTranslation();

	if (!CoinId) {
		return <Navigate to={ROUTES.NOT_FOUND} replace />;
	}

	const { data, isLoading, error } = CoinsStatsAPI.endpoints.getCoinById.useQuery(CoinId, {
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

	if (error) {
		return <div>{t('Ошибка загрузки')}</div>;
	}

	const marketCap = Utils.Number.formatBigNumber(data.marketCap);

	return (
		<div className={styles.CoinPage}>
			<div className={styles.CoinPageTitle}>
				<div className={styles.MainInfo}>
					<div className={styles.LogoAndName}>
						<img src={data.icon} className={styles.Logo} alt=''/>
						<span className={styles.Name}>
							{data.name}
						</span>
						<span className={styles.Symbol}>
							{data.symbol}
						</span>
					</div>

					<div className={styles.PricesAndPercent}>
						<div className={styles.Prices}>
							<span className={styles.PriceUSD}>
								$ {Utils.Number.formatPrice(data.price)}
							</span>
							<br/>
							<span className={styles.PriceRUB}>
								{/* eslint-disable-next-line i18next/no-literal-string */}
								{/*Todo*/}
								₽ {Utils.Number.formatPrice(data.price * 80)}
							</span>
						</div>

						<div className={styles.Percent}>
							{PercentageColor({
								percent: data.priceChange1d
							})}
						</div>
					</div>

					<div className={styles.MarketCap}>
						<div className={styles.Title}>
							<span>{t('Рын. Кап.')}</span>
							<InfoIcon className={styles.info}/>
						</div>
						<div className={styles.Value}>
							$ {marketCap.number} {marketCap.symbol}
						</div>
					</div>
				</div>

				<div className={styles.CoinAboutAs}>

				</div>
			</div>

			<div className={styles.CoinPageMain}>
				<div className={styles.ChartContainer}>
					<CoinLineChart coinId={CoinId} isEnableOptions={true} className={styles.Chart}/>
				</div>
			</div>
		</div>
	);
};