// eslint-disable-next-line import/named
import { LineStyle, PriceLineOptions } from 'lightweight-charts';

const priceLineATLOptions: PriceLineOptions = {
	id: 'ATL',
	price: 5,
	color: '#ff0000',
	lineWidth: 1,
	lineStyle: LineStyle.LargeDashed,
	axisLabelVisible: true,
	title: 'ATL',
	lineVisible: true,
	axisLabelColor: 'black',
	axisLabelTextColor: 'white',
};

export default priceLineATLOptions;