import './InputApp.scss';
import { FC } from 'react';

interface IInputAppProps {
    className?: string;
    placeholder?: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputApp: FC<IInputAppProps> = (props: IInputAppProps) => {
	const {
		placeholder,
		className,
		onChange,
		type = 'text',
		...otherProps
	} = props;

	return (
		<input {...otherProps}
			className={`InputApp ${className}`}
			type={type}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
};