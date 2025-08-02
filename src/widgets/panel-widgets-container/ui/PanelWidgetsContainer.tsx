import styles from './PanelWidgetsContainer.module.scss';
import { FearGreedWidget } from '../../panel-widgets/fear-greed/FearGreedWidget';
import { useEffect, useRef } from 'react';
import { CoinWidget } from '../../panel-widgets/token/CoinWidget';
import { DominanceWidget } from '../../panel-widgets/dominance/DominanceWidget';

export const PanelWidgetsContainer = () => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = scrollContainerRef.current;
		if (!el) return;

		const onWheel = (e: WheelEvent) => {
			if (e.deltaY === 0) return;
			e.preventDefault(); // чтобы не было вертикального скролла
			el.scrollLeft += e.deltaY;
		};

		el.addEventListener('wheel', onWheel, { passive: false });
		return () => el.removeEventListener('wheel', onWheel);
	}, []);

	return (
		<div className={styles.ScrollContainer} ref={scrollContainerRef}>
			<div className={styles.PanelWidgetsContainer}>
				<FearGreedWidget />
				<CoinWidget coinId='bitcoin'/>
				<CoinWidget coinId='ethereum'/>
				{/*<FlipWrapper*/}
				{/*	frontContent={<div style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>front</div>}*/}
				{/*	backContent={<div style={{ backgroundColor: 'blue', width: '100%', height: '100%' }}>back</div>}*/}
				{/*/>*/}
				<DominanceWidget/>
				<div style={{ backgroundColor: 'red' }}></div>
				<div style={{ backgroundColor: 'red' }}></div>
			</div>
		</div>
	);
};