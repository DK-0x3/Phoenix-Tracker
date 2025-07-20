import styles from './Skeleton.module.scss';
import { cn } from '../../lib/cn/cn';
import { CSSProperties } from 'react';

interface ISkeletonProps {
	width?: string | number;
	height?: string | number;
	borderRadius?: string | number;
	className?: string;
	baseColor?: string;
}

export const Skeleton = ({
							 width = '100%',
							 height = '100%',
							 borderRadius = '4px',
							 className,
							 baseColor = '#4a4a4a',
						 }: ISkeletonProps) => {
	return (
		<div
			className={cn(styles.Skeleton, className)}
			style={{
				width,
				height,
				borderRadius,
				'--skeleton-base-color': baseColor,
			} as CSSProperties}
		/>
	);
};