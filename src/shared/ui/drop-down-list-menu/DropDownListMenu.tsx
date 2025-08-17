import React, { useEffect, useId, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './DropDownListMenu.module.scss';
import { cn } from '../../lib/cn/cn';
import Placement from './types/Placement';
import IBaseMenuItemValue from './types/IBaseMenuItemValue';
import IDropdownItem from './types/IDropdownItem';
import ChevronDown from './types/ChevronDownIcon';

/**
 * Свойства компонента DropdownMenu
 *
 * @template ValueT - тип значения элементов меню
 */
export interface IDropdownMenuProps<ValueT extends IBaseMenuItemValue> {
    /** Текст или элемент кнопки, открывающей меню */
    label?: React.ReactNode;
    /** Список элементов меню */
    items: IDropdownItem<ValueT>[];
    /** Функция вызывается при выборе элемента */
    onSelect?: (item: IDropdownItem<ValueT>) => void;
    /** Позиция меню относительно кнопки: 'top' | 'bottom' | 'left' | 'right' */
    placement?: Placement;

    /** Кастомизация внешнего контейнера */
    className?: string;
    style?: React.CSSProperties;
    /** Кастомизация кнопки открытия */
    buttonClassName?: string;
    buttonStyle?: React.CSSProperties;
    /** Кастомизация контейнера меню */
    menuClassName?: string;
    menuStyle?: React.CSSProperties;
    /** Кастомизация элементов меню */
    itemClassName?: string;
    itemStyle?: React.CSSProperties;

    /** Минимальная ширина меню */
    menuMinWidth?: number;
}


/**
 * Компонент DropdownMenu — выпадающее меню с поддержкой кастомизации,
 * позиционирования и управления клавиатурой.
 *
 * @template ValueT - тип значения элементов меню
 *
 * @example
 * ```tsx
 * const items = [
 *   { value: { id: 1 }, label: 'Первый', icon: <Icon1 /> },
 *   { value: { id: 2 }, label: 'Второй', disabled: true },
 * ];
 *
 * <DropdownMenu
 *   label="Выберите элемент"
 *   items={items}
 *   onSelect={(item) => console.log(item)}
 *   placement="bottom"
 * />
 * ```
 */
export const DropdownMenu = <ValueT extends IBaseMenuItemValue,>({
	label = 'Menu',
	items,
	onSelect,
	placement = 'bottom',

	className,
	style,
	buttonClassName,
	buttonStyle,
	menuClassName,
	menuStyle,
	itemClassName,
	itemStyle,

	menuMinWidth = 180,
}: IDropdownMenuProps<ValueT>) => {
	const [open, setOpen] = useState(false);
	const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

	const rootRef = useRef<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const menuId = useId();

	/** Закрытие меню при клике вне компонента */
	useEffect(() => {
		const handlePointerDown = (e: MouseEvent | TouchEvent) => {
			if (!rootRef.current) return;
			if (!rootRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handlePointerDown);
		document.addEventListener('touchstart', handlePointerDown);
		return () => {
			document.removeEventListener('mousedown', handlePointerDown);
			document.removeEventListener('touchstart', handlePointerDown);
		};
	}, []);

	/** Закрытие меню по клавише Escape */
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpen(false);
				buttonRef.current?.focus();
			}
		};
		if (open) document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [open]);

	/** Вычисление позиции меню при открытии */
	useEffect(() => {
		if (open && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect();
			const scrollY = window.scrollY;
			const scrollX = window.scrollX;
			const menuEl = document.getElementById(menuId);
			if (!menuEl) return;

			const menuRect = menuEl.getBoundingClientRect();
			const offset = 8; // расстояние от кнопки

			let top = 0;
			let left = 0;

			// базовое позиционирование
			switch (placement) {
			case 'bottom':
				top = rect.bottom + scrollY + offset;
				left = rect.left + scrollX + rect.width / 2 - menuRect.width / 2;
				break;
			case 'top':
				top = rect.top + scrollY - menuRect.height - offset;
				left = rect.left + scrollX + rect.width / 2 - menuRect.width / 2;
				break;
			case 'left':
				top = rect.top + scrollY + rect.height / 2 - menuRect.height / 2;
				left = rect.left + scrollX - menuRect.width - offset;
				break;
			case 'right':
				top = rect.top + scrollY + rect.height / 2 - menuRect.height / 2;
				left = rect.right + scrollX + offset;
				break;
			}

			// корректировка, чтобы не выходило за экран
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;

			// по горизонтали
			if (left < 0) left = 4; // небольшой отступ от края
			if (left + menuRect.width > viewportWidth) left = viewportWidth - menuRect.width - 4;

			// по вертикали
			if (top < 0) top = 4;
			if (top + menuRect.height > viewportHeight + scrollY) top = viewportHeight + scrollY - menuRect.height - 4;

			setMenuPos({ top, left });
		}
	}, [open, placement, menuId]);

	const menuContent = (
		<ul
			id={menuId}
			role="menu"
			aria-label="Dropdown menu"
			className={cn(
				styles.ddmMenu,
				open && styles.open,
				styles[`placement-${placement}`],
				menuClassName
			)}
			style={{
				top: menuPos.top,
				left: menuPos.left,
				minWidth: menuMinWidth,
				...menuStyle,
			}}
		>
			{items.map((item, idx) => (
				<li key={item.value.id} role="none">
					<button
						ref={(el) => void (itemRefs.current[idx] = el)}
						role="menuitem"
						type="button"
						aria-disabled={item.disabled || undefined}
						disabled={item.disabled}
						className={cn(styles.ddmItem, itemClassName)}
						style={itemStyle}
						onClick={() => {
							if (item.disabled) return;
							onSelect?.(item);
							setOpen(false);
							buttonRef.current?.focus();
						}}
					>
						{item.icon && <span aria-hidden>{item.icon}</span>}
						<span>{item.label}</span>
					</button>
				</li>
			))}
		</ul>
	);

	return (
		<div
			ref={rootRef}
			className={cn(styles.dd, className)}
			style={{ display: 'inline-block', ...style }}
		>
			<button
				ref={buttonRef}
				type="button"
				aria-haspopup="menu"
				aria-expanded={open}
				aria-controls={menuId}
				className={cn(styles.ddmButton, buttonClassName)}
				style={{
					...buttonStyle,
				}}
				onClick={() => setOpen((p) => !p)}
			>
				{label}
				<ChevronDown rotated={open} />
			</button>

			{ReactDOM.createPortal(menuContent, document.body)}
		</div>
	);
};
