import styles from './FearGreedWidget.module.scss';
import FearGreed from '../../../shared/assets/svg/fear-greed.svg';
import FearGreedCursor from '../../../shared/assets/svg/fear-greed-cursor.svg';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFearAndGreedData } from '../../../shared/lib/hooks/useFearAndGreedData';

export const FearGreedWidget = () => {
	const { t } = useTranslation();
	const { data, isLoading, error } = useFearAndGreedData();
	const [angle, setAngle] = useState(0);

	useEffect(() => {
		if (data) {
			setAngle(data.now.value * 1.8);
		}
	}, [data]);

	if (!data && error) {
		return <div>{t('Ошибка загрузки')}</div>;
	}

	return (
		<div className={styles.FlipMain}>
			<div className={styles.FlipInner}>

				<div className={styles.FearGreedWidgetFront}>
					<div className={styles.FearGreedContainer}>
						<FearGreed className={styles.FearGreedColor} />
						<span style={{ fontSize: isLoading ? '14px' : '40px' }}>
							{isLoading ? 'Загрузка...' : data?.now.value ?? '_'}
						</span>
						<div
							style={{
								transform: `translate(-50%, -50%) rotate(${angle}deg)`,
								transition: 'transform 0.4s ease-in-out',
							}}
						>
							<FearGreedCursor style={{ marginLeft: '-7px' }} />
						</div>
					</div>
					<span>{t(data?.now.value_classification ?? 'Ошибка')}</span>
				</div>

				<div className={styles.FearGreedWidgetBack}>
					{/* eslint-disable-next-line i18next/no-literal-string */}
					<span>
						Fear & Greed Indicator:
					</span>
					{t('отражает доминирующие эмоции на рынке: страх или жадность.')}
				</div>

			</div>
		</div>
	);
};