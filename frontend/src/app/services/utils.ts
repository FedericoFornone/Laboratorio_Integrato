import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ApiModel } from '../models/api.model';

export const assembleUrl = (
  endpoint: 'statistics' | 'predictions',
  region: string,
  date: string,
  infrastructure?: 'hotel' | 'other',
  residenceCountry?: 'italy' | 'foreign'
) => {
  let url = `http://localhost:7790/${endpoint}?region=${region}&date=${date}&dateType=monthly`;

  if (infrastructure) {
    url += '&infrastructure=' + infrastructure;
  }

  if (residenceCountry) {
    url += '&residenceCountry=' + residenceCountry;
  }

  return url;
};

export const reduceByDate = (
  data: ApiModel[],
  parameter: 'Arrivals' | 'Attendance'
) => {
  const reducedData = data.reduce((acc: { [key: string]: number }, item) => {
    const date = item.Date;
    const result = item[parameter];

    if (acc[date]) {
      acc[date] += result;
    } else {
      acc[date] = result;
    }

    return acc;
  }, {});

  return reducedData;
};

export const generateChartData = (
  labels: string[],
  values: any,
  titleText: string,
  label: string
) => {
  const barChartData: ChartConfiguration<'bar'>['data'] = {
    labels,
    datasets: [
      {
        data: values,
        label,
        backgroundColor: '#E70B67',
        borderRadius: 5,
      },
    ],
  };
  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: titleText,
        font: {
          size: 16,
        },
      },
    },
  };
  const barChartLegend = false;

  return {
    chartData: barChartData,
    options: barChartOptions,
    mobileOptions: {
      ...barChartOptions,
      indexAxis: 'y',
    },
    legend: barChartLegend,
  };
};
