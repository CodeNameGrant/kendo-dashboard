import React from 'react';
import 'hammerjs';
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels
} from '@progress/kendo-react-charts'
import { percentSold } from '../store/app-data';

const labelTemplate = e => (e.category + '\n'+ e.value + '%');
// const labelTemplate = (e) => {
//   console.log("labelTemplate", e);
//   return e.category + '\n'  + (e.percentage*100) +'%';
//};

const DonutChart = () => {
  return (
    <Chart style={{ height: 300 }}>
      <ChartSeries>
        <ChartSeriesItem
          type='donut'
          data={percentSold}
          categoryField='foodType'
          field='percentSold'
          padding={0}
        >
          <ChartSeriesLabels color="#fff" background="none" content={labelTemplate} />
        </ChartSeriesItem>
      </ChartSeries>
      <ChartLegend visible={false} />
    </Chart>
  )
}

export default DonutChart;