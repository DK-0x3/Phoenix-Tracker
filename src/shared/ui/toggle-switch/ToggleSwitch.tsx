import { FC, useState } from 'react';

type ToggleSwitchProps = {
    label?: string;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
};

export const ToggleSwitch: FC<ToggleSwitchProps> = ({ label, disabled = false, onChange }) => {
	const [checked, setChecked] = useState(false);

	const handleClick = () => {
		if (disabled) return;
		setChecked(prev => {
			const next = !prev;
			onChange?.(next); // уведомляем родителя, если передан onChange
			return next;
		});
	};

	return (
		<label style={{ display: 'flex',
			alignItems: 'center', gap: '8px',
			cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
			{label && <span style={{ fontSize: '14px', color: '#eee' }}>{label}</span>}

			<div
				onClick={handleClick}
				style={{
					position: 'relative',
					width: '48px',
					height: '24px',
					borderRadius: '12px',
					backgroundColor: checked ? '#4ade80' : '#555',
					transition: 'background-color 0.3s',
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: '2px',
						left: '2px',
						width: '20px',
						height: '20px',
						borderRadius: '50%',
						backgroundColor: '#fff',
						boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
						transform: checked ? 'translateX(24px)' : 'translateX(0)',
						transition: 'transform 0.3s',
					}}
				/>
			</div>
		</label>
	);
};
