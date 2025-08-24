import { DropdownMenu } from '../../../shared/ui/drop-down-list-menu/DropDownListMenu';
import IDropdownItem from '../../../shared/ui/drop-down-list-menu/types/IDropdownItem';
import styles from './CoinChart.module.scss';
import ICoinTimeZoneValue from '../types/ICoinTimeZoneValue';

export const CoinTimeSelector = ({ options, value, onSelect }: {
    options: IDropdownItem<ICoinTimeZoneValue>[],
    value: IDropdownItem<ICoinTimeZoneValue>,
    onSelect: (value: IDropdownItem<ICoinTimeZoneValue>) => void
}) => (
	<DropdownMenu
		buttonStyle={{
			backgroundColor: 'transparent',
			border: '1px solid var(--dark-gray)',
			boxShadow: 'none',
		}}
		menuStyle={{
			backgroundColor: 'var(--color-dark-600)',
			display: 'flex',
		}}
		itemClassName={styles.DropDownTimeItem}
		onSelect={onSelect}
		label={value.label}
		items={options}
		placement='top'
	/>
);
