export const CorrectPrice = (price: number) => {
	return Number(price.toPrecision(10));
};