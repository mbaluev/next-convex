import { randomInt } from '@/lib/utils/random';
import moment from 'moment';

export enum ETransitionsChartType {
  stackedBarChart = 'bar-stacked',
  groupedBarChart = 'bar-grouped',
  areaChart = 'area',
  stackedAreaChart = 'area-stacked',
  lineChart = 'line',
}

export interface IChartItem extends Record<string, any> {
  a: number;
  b: number;
  c: number;
  date: string;
}

export interface IChartLegendItem {
  key: string;
  color: string;
}

const length = 50;

export const DEFAULT_TRANSITIONS_CHART_TYPE = ETransitionsChartType.stackedBarChart;

export const MOCK_TRANSITIONS_CHART_DATA: IChartItem[] = Array.from({ length }).map((_, i) => {
  return {
    a: randomInt(-100000, 100000),
    b: randomInt(-100000, 100000),
    c: randomInt(-100000, 100000),
    date: moment({
      year: moment(new Date())
        .subtract(length - i - 1, 'months')
        .year(),
      month: moment(new Date())
        .subtract(length - i - 1, 'months')
        .month(),
    })
      .startOf('month')
      .format('YYYY-MM-DD'),
  };
});

export const MOCK_TRANSITIONS_CHART_LEGEND: IChartLegendItem[] = [
  {
    key: 'a',
    color: 'chart-1',
  },
  {
    key: 'b',
    color: 'chart-2',
  },
  {
    key: 'c',
    color: 'chart-3',
  },
];
