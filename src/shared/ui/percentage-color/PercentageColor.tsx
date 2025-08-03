import styles from './PercentageColor.module.scss';
import { cn } from '../../lib/cn/cn';

interface IPercentageColorProps {
    percent: string | number;
	className?: string;
}

export const PercentageColor = (props: IPercentageColorProps) => {
	const { percent, className } = props;

	let percentString: string = '';

	if (typeof percent === 'string') {
		percentString = percent;
	} else {
		percentString = percent.toFixed(2);
	}

	const resultColor = percentString.startsWith('-') ? 'var(--red)' : 'var(--green)';

	if (!percentString.endsWith('%')) {
		percentString += '%';
	}

	return (
		<div style={{ color: resultColor }} className={cn(styles.PercentageColor, className)}>
			{percentString}
		</div>
	);
};