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
