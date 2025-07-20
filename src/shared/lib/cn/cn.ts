/**
 * Утилита для объединения CSS-классов в одну строку.
 *
 * Позволяет передавать любое количество строковых аргументов,
 * а также `undefined`, `null` или `false` — они будут проигнорированы.
 * Полезна для безопасного объединения условных классов без внешних зависимостей (`clsx`, `classnames` и т.п.).
 *
 * Пример:
 * ```ts
 * cn('button', isActive && 'active', isDisabled && 'disabled');
 * // => 'button active' (если isActive === true, isDisabled === false)
 * ```
 *
 * @param args - Список классов: строк, `undefined`, `null` или `false`.
 * @returns Объединённая строка с валидными CSS-классами.
 */
export function cn(...args: (string | undefined | false | null)[]): string {
	return args.filter(Boolean).join(' ');
}
