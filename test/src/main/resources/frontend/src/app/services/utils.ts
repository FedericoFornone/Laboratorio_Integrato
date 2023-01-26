import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ApiModel } from '../models/api.model';

/* We're using two different endpoints: statistics and predictions.
Each endpoints has a certain set of parameters, and not all of them are required.
We're using these functions to assemble the url for the api call with the correct parameters. */
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

/* The api response is an array of object, with each object having multiple values
that we don't really need. This functions is used to reduce the response to a series of 
key value pairs, where the key represents the current date, and the value represents the number
of tourists on that date */
export const reduceByDate = (
  data: ApiModel[],
  parameter: 'Arrivals' | 'Attendance'
) => {
  /* reducing all the results from the same date into a single key value pair */
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

/* since we're using the same chart config for every graph, we use this single
function that handles all the logic for it */
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
      x: {
        ticks: {
          font: {
            family: 'Nunito',
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: 'Nunito',
          },
          // changin numbers to a more readable format
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
          family: 'Nunito',
        },
      },
      legend: {
        labels: {
          font: {
            family: 'Nunito',
          },
        },
      },
    },
  };
  const barChartLegend = false;

  return {
    chartData: barChartData,
    options: barChartOptions,
    /* this object represent the chart config to use when displaying
    the charts on smaller screens */
    mobileOptions: {
      ...barChartOptions,
      // the main difference is that we're using a horizontal bar chart
      indexAxis: 'y',
      scales: {
        y: {
          ticks: {
            font: {
              family: 'Nunito',
            },
          },
        },
        x: {
          ticks: {
            font: {
              family: 'Nunito',
            },
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

/* could have just used a fixed array of lables, but this
function ensures that we're getting only the months that the api
returns, and that they're properly translated in the current language */
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
