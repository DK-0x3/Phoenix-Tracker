// eslint-disable-next-line import/named
import { LineStyle, PriceLineOptions } from 'lightweight-charts';

const priceLineATHOptions: PriceLineOptions = {
	id: 'ATH',
	price: 0.6,
	color: '#4b00f9',
	lineWidth: 2,
	lineStyle: LineStyle.LargeDashed,
	axisLabelVisible: true,
	title: 'ATH',
	lineVisible: true,
	axisLabelColor: 'black',
	axisLabelTextColor: 'white',
};

export default priceLineATHOptions;