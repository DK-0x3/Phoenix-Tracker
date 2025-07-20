import styles from './FlipWrapper.module.scss';
import { ReactNode } from 'react';

export interface IFlipWrapperProps {
    frontContent: ReactNode,
    backContent: ReactNode,
}

/**
 * FlipWrapper — универсальный компонент-обёртка, реализующий эффект переворота карточки при наведении мыши.
 *
 * Отображает две стороны: фронтальную (лицевую) и обратную.
 * При наведении курсора происходит анимация поворота по оси Y на 180 градусов.
 *
 * Использование:
 *
 * ```tsx
 * <FlipWrapper
 *   frontContent={<div>Фронтальная сторона</div>}
 *   backContent={<div>Обратная сторона</div>}
 * />
 * ```
 *
 * Пропсы:
 * - `frontContent` — содержимое лицевой стороны (ReactNode).
 * - `backContent` — содержимое обратной стороны (ReactNode).
 *
 * Требования:
 * Родительский контейнер или сам компонент должен иметь фиксированные размеры
 * (ширину и высоту), чтобы анимация работала корректно.
 */
export const FlipWrapper = (props: IFlipWrapperProps) => {
	const { frontContent, backContent } = props;

	return (
		<div className={styles.FlipWrapper}>
			<div className={styles.FlipInner}>
				<div className={styles.FlipWrapperFront}>
					{frontContent}
				</div>

				<div className={styles.FlipWrapperBack}>
					{backContent}
				</div>
			</div>
		</div>
	);
};