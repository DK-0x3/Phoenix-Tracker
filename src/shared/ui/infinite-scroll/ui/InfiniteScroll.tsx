import { ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IInfiniteScrollProps<T> {
	fetchData: (page: number) => Promise<T[]>;
	renderItem: (item: T, index: number) => ReactNode;
	keyExtractor: (item: T, index: number) => string | number;
	pageSize?: number;
	loader?: ReactNode;
	endMessage?: ReactNode;
	height?: number | string;
}

export const InfiniteScroll = <T,>(props: IInfiniteScrollProps<T>) => {
	const { t } = useTranslation();
	const DefaultLoader = () => (<p style={{ textAlign: 'center' }}>{t('Загрузка')}...</p>);
	const DefaultEndMessage = () => (<p style={{ textAlign: 'center' }}>{t('Больше данных нет')}</p>);

	const {
		fetchData,
		renderItem,
		keyExtractor,
		pageSize = 20,
		loader = <DefaultLoader/>,
		endMessage = <DefaultEndMessage/>,
		height = '100%'
	} = props;

	const [items, setItems] = useState<T[]>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const loaderRef = useRef<HTMLDivElement | null>(null);

	// Загружаем данные при изменении страницы
	useEffect(() => {
		if (!hasMore) return;

		setLoading(true);
		fetchData(page).then((newItems) => {
			setItems((prev) => [...prev, ...newItems]);
			setHasMore(newItems.length >= pageSize);
			setLoading(false);
		});
	}, [page]);

	// Настраиваем observer один раз
	useEffect(() => {
		if (!loaderRef.current) return;

		let isProcessing = false;

		const observer = new IntersectionObserver(
			(entries) => {
				const firstEntry = entries[0];
				if (
					firstEntry.isIntersecting &&
					!loading &&
					!isProcessing &&
					hasMore
				) {
					isProcessing = true; // блокируем повторное срабатывание
					setPage((prev) => prev + 1);
					setTimeout(() => (isProcessing = false), 300);
					// маленькая задержка, чтобы observer не дёргал сразу ещё раз
				}
			},
			{ rootMargin: '100px' }
		);

		observer.observe(loaderRef.current);
		return () => observer.disconnect();
	}, [loading, hasMore]);

	return (
		<div style={{ height, overflowY: 'hidden' }}>
			<ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
				{items.map((item, index) => (
					<li
						key={keyExtractor(item, index)}
					>
						{renderItem(item, index)}
					</li>
				))}
			</ul>
			{loading && loader}
			{hasMore && <div ref={loaderRef} style={{ height: 1 }} />}
			{!hasMore && endMessage}
		</div>
	);
};