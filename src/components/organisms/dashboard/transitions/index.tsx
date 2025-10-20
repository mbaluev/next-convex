'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TransitionsChartCreate } from '@/components/organisms/dashboard/transitions/create';
import {
  ETransitionsChartType,
  MOCK_TRANSITIONS_CHART_LEGEND,
  DEFAULT_TRANSITIONS_CHART_TYPE,
} from '@/components/organisms/dashboard/transitions/mock';
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
import { TransitionsChartColors } from '@/components/organisms/dashboard/transitions/colors';
import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { useQueryString } from '@/lib/hooks/use-query-string';

interface ITransitionsChartProps extends WidgetProps {
  name?: string;
}

export const TransitionsChart = (props: ITransitionsChartProps) => {
  const ref = useRef<any>(null);
  const [chart, setChart] = useState<any>(null);
  const router = useRouter();
  const params = useSearchParams();
  const typeName = props.name ?? 'type';
  const type = params.get(typeName) ?? DEFAULT_TRANSITIONS_CHART_TYPE;
  const id = `widget-chart-${v4()}`;

  // load data
  const dashboard = useQuery(api.dashboard.get);
  const data = useMemo(() => dashboard ?? [], [dashboard]);
  const dataLegend = MOCK_TRANSITIONS_CHART_LEGEND;
  const loading = !dashboard;

  // helpers
  const formatValue = (value: number) => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
    }).format(value);
  };

  // change type, reset
  const searchParams = useSearchParams();
  const { addParam, removeParam } = useQueryString(searchParams);
  const handleChange = (type: ETransitionsChartType) => {
    const queryString = addParam(typeName, type);
    const path = ROUTES.DASHBOARD.path;
    router.push(`${path}?${queryString}`);
  };
  const handleReset = () => {
    const queryString = removeParam(typeName);
    const path = ROUTES.DASHBOARD.path;
    router.push(`${path}?${queryString}`);
  };

  // create, resize
  const { width, height, start } = useResizeObserver(ref, 100);
  const create = useCallback(() => {
    if (ref.current) {
      const obj = TransitionsChartCreate(ref, id, data, dataLegend, type, formatValue);
      setChart(obj);
    }
  }, [ref, id, type, data, dataLegend]);
  useEffect(() => {
    if (ref.current && chart && width > 0 && height > 0 && start) {
      chart?.remove();
      setChart(null);
    }
    if (ref.current && width > 0 && height > 0 && !start) {
      create();
    }
  }, [ref, start, width, height]);

  // update
  useEffect(() => {
    if (ref.current && chart) {
      chart.update(data, type);
    }
  }, [ref, type, data]);

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
              variant={
                !type || type === ETransitionsChartType.stackedBarChart ? 'default' : 'ghost'
              }
              size="icon"
              onClick={() => handleChange(ETransitionsChartType.stackedBarChart)}
            >
              <ChartColumnStacked />
            </Button>
          </TooltipText>
          <TooltipText title="grouped bar chart" side="top">
            <Button
              variant={type === ETransitionsChartType.groupedBarChart ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleChange(ETransitionsChartType.groupedBarChart)}
            >
              <ChartColumn />
            </Button>
          </TooltipText>
          <TooltipText title="area bar chart" side="top">
            <Button
              variant={type === ETransitionsChartType.areaChart ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleChange(ETransitionsChartType.areaChart)}
            >
              <ChartSpline />
            </Button>
          </TooltipText>
          <TooltipText title="stacked area chart" side="top">
            <Button
              variant={type === ETransitionsChartType.stackedAreaChart ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleChange(ETransitionsChartType.stackedAreaChart)}
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
              <Spinner className="text-[2rem] text-muted-foreground" />
            </div>
          )}
        </div>
      </WidgetContent>
      <TransitionsChartColors />
    </Widget>
  );
};
