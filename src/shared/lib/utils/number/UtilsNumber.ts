interface IFormattedBigNumber {
    number: number;
    symbol: string;
}

class UtilsNumber {
	/**
     * Форматирует большое число в удобный вид с суффиксами (K, M, B, T).
     *
     * Примеры:
     * - 1500 → { number: 1.5, symbol: 'K' }
     * - 2_500_000 → { number: 2.5, symbol: 'M' }
     * - 7_200_000_000 → { number: 7.2, symbol: 'B' }
     *
     * @param num Число для форматирования
     * @returns Объект с числом и суффиксом
     */
	public formatBigNumber = (num: number): IFormattedBigNumber => {
		const absNum = Math.abs(num);

		if (absNum >= 1e12) {
			return { number: +(num / 1e12).toFixed(2), symbol: 'T' }; // триллион
		}
		if (absNum >= 1e9) {
			return { number: +(num / 1e9).toFixed(2), symbol: 'B' }; // миллиард
		}
		if (absNum >= 1e6) {
			return { number: +(num / 1e6).toFixed(2), symbol: 'M' }; // миллион
		}
		if (absNum >= 1e3) {
			return { number: +(num / 1e3).toFixed(2), symbol: 'K' }; // тысяча
		}

		return { number: num, symbol: '' };
	};

	/**
     * Форматирует цену в удобочитаемый строковый вид.
     *
     * Правила:
     * - если целая часть ≥ 4 символов → округляем до целого
     * - если 2–3 символа → оставляем 2 знака после запятой
     * - если 1 или меньше → оставляем 6 знаков после запятой
     * - целая часть числа разбивается пробелами по разрядам
     *
     * Примеры:
     * - 12345.678 → "12 346"
     * - 123.456 → "123.46"
     * - 0.1234567 → "0.123457"
     *
     * @param price Цена для форматирования
     * @returns Отформатированная строка
     */
	public formatPrice = (price: number): string => {
		if (!isFinite(price)) return '0';

		const integerPart = Math.floor(Math.abs(price)).toString();
		const intLength = integerPart.length;

		let formatted: string;

		if (intLength >= 4) {
			formatted = Math.round(price).toString();
		} else if (intLength >= 2) {
			formatted = price.toFixed(2);
		} else {
			formatted = price.toFixed(6);
		}

		const [intStr, fracStr] = formatted.split('.');
		const intWithSpaces = intStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

		return fracStr ? `${intWithSpaces}.${fracStr}` : intWithSpaces;
	};
}

export default UtilsNumber;
