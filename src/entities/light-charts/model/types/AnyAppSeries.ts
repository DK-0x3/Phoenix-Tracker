import AppSeries from '../services/AppSeries';

type AnyAppSeries = AppSeries<'Line'> | AppSeries<'Bar'> |
    AppSeries<'Baseline'> | AppSeries<'Area'> | AppSeries<'Histogram'>;

export default AnyAppSeries;