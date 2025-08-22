export class UtilsDate {
	/**
     * Преобразует входное значение к Date
     */
	private toDate(input: string | Date): Date {
		return typeof input === 'string' ? new Date(input) : input;
	}

	/**
     * Универсальное сравнение двух дат.
     * @returns -1 если a < b, 0 если равны, 1 если a > b
     */
	public compareDates(a: string | Date, b: string | Date): number {
		const dateA = this.toDate(a).getTime();
		const dateB = this.toDate(b).getTime();

		if (dateA < dateB) return -1;
		if (dateA > dateB) return 1;
		return 0;
	}

	/**
     * Проверяет, раньше ли a чем b
     */
	public isBefore(a: string | Date, b: string | Date): boolean {
		return this.compareDates(a, b) === -1;
	}

	/**
     * Проверяет, позже ли a чем b
     */
	public isAfter(a: string | Date, b: string | Date): boolean {
		return this.compareDates(a, b) === 1;
	}

	/**
     * Проверяет, раньше или равно ли a чем b
     */
	public isSameOrBefore(a: string | Date, b: string | Date): boolean {
		const cmp = this.compareDates(a, b);
		return cmp === -1 || cmp === 0;
	}

	/**
     * Проверяет, позже или равно ли a чем b
     */
	public isSameOrAfter(a: string | Date, b: string | Date): boolean {
		const cmp = this.compareDates(a, b);
		return cmp === 1 || cmp === 0;
	}

	/** Парсит смещение из строки: Z, +03:00, -05:30. Если нет — 0 (UTC). */
	private getTargetOffsetMinutes(input: string | Date): number {
		if (typeof input === 'string') {
			const m = input.match(/(Z|[+-]\d{2}:?\d{2})$/);
			if (m) {
				if (m[1] === 'Z') return 0;
				const sign = m[1][0] === '-' ? -1 : 1;
				const [hh, mm] = m[1].slice(1).split(':');
				return sign * (parseInt(hh, 10) * 60 + parseInt(mm, 10));
			}
		}
		return 0; // дефолт UTC
	}

	/** Секунды времени суток в заданном офсете (фикс. смещение, без DST). */
	private timeOfDaySecondsInOffset(date: Date, offsetMin: number): number {
		const secUTC =
            date.getUTCHours() * 3600 +
            date.getUTCMinutes() * 60 +
            date.getUTCSeconds();
		let s = secUTC + offsetMin * 60;
		s %= 86400;
		if (s < 0) s += 86400;
		return s;
	}

	/** Вытаскивает время суток из строки (ISO или "HH:mm[:ss][+HH:MM|Z]") или Date. */
	private extractValidUntilSeconds(validUntil: string | Date, targetOffset: number): number {
		if (typeof validUntil === 'string') {
			// Формат "HH:mm[:ss][.ms][Z|+HH:MM|-HH:MM]" или ISO
			const timeOnly = validUntil.match(
				/^(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/
			);
			if (timeOnly) {
				const h = parseInt(timeOnly[1], 10);
				const m = parseInt(timeOnly[2], 10);
				const s = timeOnly[3] ? parseInt(timeOnly[3], 10) : 0;
				return h * 3600 + m * 60 + s; // как записано в этой зоне
			}
			const iso = validUntil.match(/T(\d{2}):(\d{2})(?::(\d{2}))?/);
			if (iso) {
				const h = parseInt(iso[1], 10);
				const m = parseInt(iso[2], 10);
				const s = iso[3] ? parseInt(iso[3], 10) : 0;
				return h * 3600 + m * 60 + s; // локальное время из ISO в указанной зоне
			}
			// Фолбэк: парсим как Date и считаем время суток в целевой зоне
			const d = new Date(validUntil);
			if (!isNaN(d.getTime())) return this.timeOfDaySecondsInOffset(d, targetOffset);
			throw new Error('Invalid validUntil format');
		} else {
			return this.timeOfDaySecondsInOffset(validUntil, targetOffset);
		}
	}

	/**
     * Сравнивает ТОЛЬКО время суток ComparisonDate с "временем до" validUntil.
     * Зона берётся из validUntil (Z/±HH:MM). Если нет — считаем UTC.
     * Возвращает true, если ComparisonDate ПОЗЖЕ "времени до" (то есть истекло).
     * Равенство считается валидным (включительно).
     */
	public isExpiredByTimeOfDay(
		ComparisonDate: string | Date,
		validUntil?: string | Date,
	): boolean {
		if (!validUntil) {
			validUntil = '00:00Z';
		}

		const targetOffset = this.getTargetOffsetMinutes(validUntil);
		const fDate = typeof ComparisonDate === 'string' ? new Date(ComparisonDate) : ComparisonDate;
		if (isNaN(fDate.getTime())) throw new Error('Invalid ComparisonDate date');

		const fetchedSec = this.timeOfDaySecondsInOffset(fDate, targetOffset);
		const untilSec = this.extractValidUntilSeconds(validUntil, targetOffset);

		return fetchedSec > untilSec;
	}
}

export default UtilsDate;