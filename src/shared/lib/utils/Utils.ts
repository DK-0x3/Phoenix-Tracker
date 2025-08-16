import UtilsDate from './date/UtilsDate';
import UtilsTime from './time/UtilsTime';
import UtilsNumber from './number/UtilsNumber';

const Utils = {
	Date: new UtilsDate(),
	Time: new UtilsTime(),
	Number: new UtilsNumber(),
};

export default Utils;