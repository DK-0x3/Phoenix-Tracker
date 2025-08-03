export const CorrectPrice = (price: number): string => {
	if (!isFinite(price)) return '0';

	// выделяем целую часть числа
	const integerPart = Math.floor(Math.abs(price)).toString();
	const intLength = integerPart.length;

	let formatted: string;

	if (intLength >= 4) {
		// 4 и более знаков → округляем до целого
		formatted = Math.round(price).toString();
	} else if (intLength >= 2) {
		// 2–3 знака → 2 знака после запятой
		formatted = price.toFixed(2);
	} else {
		// 1 или меньше → 6 знаков после запятой
		formatted = price.toFixed(6);
	}

	// разделяем на целую и дробную части
	const [intStr, fracStr] = formatted.split('.');

	// форматируем целую часть пробелами
	const intWithSpaces = intStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

	return fracStr ? `${intWithSpaces}.${fracStr}` : intWithSpaces;
};