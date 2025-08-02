interface ICorrectBigNumber {
    number: number;
    symbol: string;
}

export const CorrectBigNumber = (num: number): ICorrectBigNumber => {
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