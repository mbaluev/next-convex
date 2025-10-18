'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TransitionsCreate } from '@/components/organisms/dashboard/transitions/create';
import {
  EChartType,
  MOCK_CHART_LEGEND,
  DEFAULT_CHART_TYPE,
} from '@/components/organisms/dashboard/chart/mock';
import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle,
  WidgetButtons,
  WidgetIcon,
  WidgetProps,
} from '@/components/molecules/widget';
import { Button } from '@/components/atoms/button';
import {
  ChartArea,
  ChartColumn,
  ChartColumnStacked,
  ChartSpline,
  LayoutDashboard,
  RefreshCw,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/atoms/spinner';
import { useResizeObserver } from '@/lib/hooks/use-resize-observer';
import { v4 } from 'uuid';
import { TooltipText } from '@/components/atoms/tooltip';
import { ROUTES } from '@/lib/settings/routes';
import { ChartColors } from '@/components/organisms/dashboard/chart/colors';
import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { useQueryString } from '@/lib/hooks/use-query-string';

interface ITransitionsChartProps extends WidgetProps {
  name?: string;
}

export const TransitionsChart = (props: ITransitionsChartProps) => {
  const ref = useRef<any>(null);
  const [chart, setChart] = useState<any>();
  const router = useRouter();
  const params = useSearchParams();
  const typeName = props.name ?? 'type';
  const type = params.get(typeName) ?? DEFAULT_CHART_TYPE;
  const loading = false;
  const id = `widget-chart-${v4()}`;

  // load data
  const dashboard = useQuery(api.dashboard.get);
  const data = useMemo(() => dashboard ?? [], [dashboard]);
  const dataLegend = MOCK_CHART_LEGEND;

  // create chart
  const formatValue = (value: number) => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
    }).format(value);
  };
  const create = useCallback(() => {
    if (ref.current) {
      const obj = TransitionsCreate(ref, id, data, dataLegend, type, formatValue);
      setChart(obj);
    }
  }, [ref, type, data, dataLegend, id]);

  // update
  const searchParams = useSearchParams();
  const { addParam, removeParam } = useQueryString(searchParams);
  const handleChange = (type: EChartType) => {
    const queryString = addParam(typeName, type);
    const path = ROUTES.DASHBOARD.path;
    router.push(`${path}?${queryString}`);
  };
  const handleReset = () => {
    const queryString = removeParam(typeName);
    const path = ROUTES.DASHBOARD.path;
    router.push(`${path}?${queryString}`);
  };
  useEffect(() => {
    if (chart) chart.update(data, type);
  }, [type, data]);

  // create, resize
  const { width, height, start } = useResizeObserver(ref, 100);
  useEffect(() => {
    if (width > 0 && height > 0 && start) chart?.remove();
    if (width > 0 && height > 0 && !start) create();
  }, [start, width, height]);

  return (
    <Widget variant="background" {...props}>
      <WidgetHeader variant="padding">
        <WidgetIcon>
          <LayoutDashboard />
        </WidgetIcon>
        <WidgetTitle>dashboard</WidgetTitle>
        <WidgetButtons>
          <TooltipText title="stacked bar chart" side="top">
            <Button
              variant={!type || type === EChartType.stackedBarChart ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleChange(EChartType.stackedBarChart)}
            >
              <ChartColumnStacked />
            </Button>
          </TooltipText>
          <TooltipText title="grouped bar chart" side="top">
            <Button
              variant={type === EChartType.groupedBarChart ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleChange(EChartType.groupedBarChart)}
            >
              <ChartColumn />
            </Button>
          </TooltipText>
          <TooltipText title="area bar chart" side="top">
            <Button
              variant={type === EChartType.areaChart ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleChange(EChartType.areaChart)}
            >
              <ChartSpline />
            </Button>
          </TooltipText>
          <TooltipText title="stacked area chart" side="top">
            <Button
              variant={type === EChartType.stackedAreaChart ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleChange(EChartType.stackedAreaChart)}
            >
              <ChartArea />
            </Button>
          </TooltipText>
          <Button variant="ghost" size="icon" onClick={handleReset}>
            <RefreshCw />
          </Button>
        </WidgetButtons>
      </WidgetHeader>
      <WidgetContent variant="padding">
        <div ref={ref} className="w-full h-full relative">
          {loading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Spinner />
            </div>
          )}
        </div>
      </WidgetContent>
      <ChartColors />
    </Widget>
  );
};
