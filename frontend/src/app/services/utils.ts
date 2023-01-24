import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ApiModel, ResponseChartData } from '../models/api.model';
import { withLatestFrom } from 'rxjs';

export const assembleUrl = (
  endpoint: 'statistics' | 'predictions',
  region: string,
  date: string,
  infrastructure?: '' | 'HOTELLIKE' | 'OTHER',
  residenceCountry?: '' | 'Italia' | 'Paesi esteri',
  covid?: 'yes' | 'no'
) => {
  let url = `http://localhost:7790/${endpoint}?region=${region}&date=${date}&dateType=monthly`;

  if (infrastructure) {
    url += '&infrastructure=' + infrastructure;
  }

  if (residenceCountry) {
    url += '&residenceCountry=' + residenceCountry;
  }

  if (covid) {
    url += '&covid=' + covid;
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
    scales: {
      y: {
        ticks: {
          callback: (value: any) => {
            let newValue;

            if (value >= 1000) {
              newValue = value / 1000 + 'k';
            }

            if (value >= 1000000) {
              newValue = value / 1000000 + 'm';
            }

            return newValue;
          },
        },
      },
    },
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
      scales: {
        x: {
          ticks: {
            callback: (value: any) => {
              let newValue;

              if (value >= 1000) {
                newValue = value / 1000 + 'k';
              }

              if (value >= 1000000) {
                newValue = value / 1000000 + 'm';
              }

              return newValue;
            },
          },
        },
      },
    },

    legend: barChartLegend,
  };
};

export const getSelectedLanguage = () => {
  return localStorage.getItem('language') || 'it';
};

export const getMonths = (arr: any) => {
  return [...Object.keys(arr)].map((label) => {
    const month = label.split('-')[1];
    const date = new Date();
    date.setMonth(Number(month) - 1);
    return date
      .toLocaleString(getSelectedLanguage(), { month: 'short' })
      .toUpperCase();
  });
};
