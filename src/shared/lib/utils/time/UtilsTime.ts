class UtilsTime {
	/** Секунды → миллисекунды */
	public secondsToMs = (seconds: number): number => {
		return seconds * 1_000;
	};

	/** Минуты → миллисекунды */
	public minutesToMs = (minutes: number): number => {
		return minutes * 60_000;
	};

	/** Часы → миллисекунды */
	public hoursToMs = (hours: number): number => {
		return hours * 3_600_000;
	};

	/** Дни → миллисекунды */
	public daysToMs = (days: number): number => {
		return days * 86_400_000;
	};

	/** Миллисекунды → секунды */
	public msToSeconds = (ms: number): number => {
		return Math.floor(ms / 1_000);
	};

	/** Миллисекунды → минуты */
	public msToMinutes = (ms: number): number => {
		return Math.floor(ms / 60_000);
	};

	/** Миллисекунды → часы */
	public msToHours = (ms: number): number => {
		return Math.floor(ms / 3_600_000);
	};

	/** Миллисекунды → дни */
	public msToDays = (ms: number): number => {
		return Math.floor(ms / 86_400_000);
	};
}

export default UtilsTime;