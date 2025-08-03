import { useState } from 'react';
import defaultIcon from '../../../assets/svg/default-coin-icon.svg?url';

interface IIconCoinProps {
	src?: string;
	className?: string;
	alt?: string;
	fallback?: string;
}

export const IconCoin = ({
							 src,
							 className,
							 alt = 'coin icon',
							 fallback = defaultIcon,
						 }: IIconCoinProps) => {
	const [imgSrc, setImgSrc] = useState(src?.trim() || fallback);

	return (
		<div className={className}>
			<img
				src={imgSrc}
				alt={alt}
				onError={() => setImgSrc(fallback)}
			/>
		</div>
	);
};