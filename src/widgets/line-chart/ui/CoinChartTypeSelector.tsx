import { DropdownMenu } from '../../../shared/ui/drop-down-list-menu/DropDownListMenu';
import IDropdownItem from '../../../shared/ui/drop-down-list-menu/types/IDropdownItem';
import styles from './CoinChart.module.scss';
import IBaseMenuItemValue from '../../../shared/ui/drop-down-list-menu/types/IBaseMenuItemValue';

export const CoinChartTypeSelector = ({ items, value, onSelect }: {
    items: IDropdownItem<IBaseMenuItemValue>[],
    value: IDropdownItem<IBaseMenuItemValue>,
    onSelect: (value: IDropdownItem<IBaseMenuItemValue>) => void
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
			border: '1px solid var(--dark-gray)',
		}}
		itemClassName={styles.DropDownTimeItem}
		onSelect={onSelect}
		label={value.label}
		items={items}
		placement='top'
	/>
);
