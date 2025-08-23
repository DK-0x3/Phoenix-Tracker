import styles from './FiatWidget.module.scss';
import FiatExchange from '../../../shared/assets/svg/fiat-exchange.svg';
import { Skeleton } from '../../../shared/ui/skeleton/Skeleton';
import { useFiatCurrencyData } from './hooks/useFiatCurrencysData';
import { useTranslation } from 'react-i18next';

/**
 * Компонент `FiatWidget` отображает курсы валют (USD, EUR, CNY) в рублях.
 *
 * Использует кастомный хук `useFiatCurrencyData` для получения данных о валютах
 * и отображает скелетон (`Skeleton`) во время загрузки.
 *
 * Каждая валюта отображается с изображением, названием и пересчитанным курсом в ₽.
 */
export const FiatWidget = () => {
	const { t } = useTranslation();
	const { data, isLoading, error } = useFiatCurrencyData();

	if (!data && error) {
		return <div>{t('Ошибка загрузки')}</div>;
	}

	if (isLoading) {
		return (
			<Skeleton
				baseColor='#2b2b39'
				width="100%"
				height='100%'
				borderRadius={12}
			/>
		);
	}

	if (!data) {
		return null;
	}

	const currencyMap = Object.fromEntries(
		data.result.map(c => [c.name, c])
	);

	let usdData = currencyMap['USD'] ? { ...currencyMap['USD'] } : null;
	let eurData = currencyMap['EUR'] ? { ...currencyMap['EUR'] } : null;
	let cnyData = currencyMap['CNY'] ? { ...currencyMap['CNY'] } : null;
	const rubData = currencyMap['RUB'] ?? null;

	if (rubData) {
		const rubPerUsd = rubData.rate;

		if (usdData) usdData.rate = (1 / usdData.rate) * rubPerUsd;
		if (eurData) eurData.rate = (1 / eurData.rate) * rubPerUsd;
		if (cnyData) cnyData.rate = (1 / cnyData.rate) * rubPerUsd;
	}

	return (
		<div
			className={styles.FiatWidget}
		>
			<div className={styles.FiatWidgetOverlay}>
				<FiatExchange className={styles.Logo}/>
			</div>

			<div className={styles.FiatWidgetContent}>
				<div className={styles.Title}>
					<img src={usdData?.imageUrl}/>
					<span>
						{usdData?.name}
					</span>
				</div>

				<div className={styles.Value}>
					<span className={styles.Price}>{usdData?.rate.toFixed(2)}</span>
					{/* eslint-disable-next-line i18next/no-literal-string */}
					<span className={styles.Currency}> ₽</span>
				</div>

				<div className={styles.Title}>
					<img src={eurData?.imageUrl}/>
					<span>
						{eurData?.name}
					</span>
				</div>
				<div className={styles.Value}>
					<span className={styles.Price}>{eurData?.rate.toFixed(2)}</span>
					{/* eslint-disable-next-line i18next/no-literal-string */}
					<span className={styles.Currency}> ₽</span>
				</div>

				<div className={styles.Title}>
					<img src={cnyData?.imageUrl}/>
					<span>
						{cnyData?.name}
					</span>
				</div>
				<div className={styles.Value}>
					<span className={styles.Price}>{cnyData?.rate.toFixed(2)}</span>
					{/* eslint-disable-next-line i18next/no-literal-string */}
					<span className={styles.Currency}> ₽</span>
				</div>
			</div>
		</div>
	);
};