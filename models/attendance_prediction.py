import sys
import numpy as np
import pandas as pd

from sklearn.linear_model import LinearRegression
from sklearn.linear_model import Ridge
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler
from skforecast.ForecasterAutoreg import ForecasterAutoreg
from skforecast.model_selection import grid_search_forecaster


def make_mask(df:pd.DataFrame, region:str, infrastructure:str, residence:str):
    df = df[(df['Region'] == region) & (df['Infrastructure'] == infrastructure) & (df['ResidenceCountry'] == residence)]
    return df


def main(region, infrastructure, residence):

    input_df = pd.read_csv('https://raw.githubusercontent.com/FedericoFornone/Laboratorio_Integrato/fintech/Data/final_data/abruzzo.csv')

    input_df.Date = pd.to_datetime(input_df.Date)

    input_df['Year'] = input_df.Date.dt.year
    input_df['Month'] = input_df.Date.dt.month
    input_df = input_df[280:]

    df = make_mask(input_df, region, infrastructure, residence)
    df.reset_index(inplace=True)
    df = df.drop(['index'], axis=1)

    df_train = df[:-24]
    df_test = df[-24:]

    df_train_attendance = df_train[['Attendance', 'Date']]
    df_test_attendance = df_test[['Attendance', 'Date']]

    # i 24 mesi di test più i 60 sconosciuti
    steps = 24 + 120

    # addestramento
    forecaster = ForecasterAutoreg(
        regressor=Ridge(),
        transformer_y=StandardScaler(),
        lags=30  # la finestra temporale che definisce le righe della matrice di feature
    )

    df_train_attendance.index = pd.DatetimeIndex(df_train_attendance.Date, freq='MS')

    forecaster.fit(y=df_train_attendance['Attendance'])

    # predizione
    df_pred = forecaster.predict(steps=steps)

    param_grid = {'alpha': [0.0001, 0.001, 0.01, 0.1, 1., 10.]}

    lags_grid = [10, 20, 30, 40]

    grid_search = grid_search_forecaster(
        forecaster=forecaster,
        y=df_train_attendance['Attendance'],
        param_grid=param_grid,
        lags_grid=lags_grid,
        steps=steps,
        metric='mean_absolute_error',
        initial_train_size=int(len(df_train) * 0.5),
        return_best=True,
        verbose=False
    )

    # addestramento
    fa_autoreg = ForecasterAutoreg(regressor=Ridge(alpha=0.001),
                                   transformer_y=StandardScaler(),
                                   lags=20)

    fa_autoreg.fit(y=df_train_attendance['Attendance'])

    # predizione
    fa_pred = fa_autoreg.predict(steps=steps)

    prediction = fa_pred[-120:]

    print(prediction.to_json(orient="index", date_format='iso'))


if __name__ == '__main__':
    main(str(sys.argv[1]), str(sys.argv[2]), str(sys.argv[3]))


# ===================================================================
# To run the script write in the terminal:
# !pip install skforecast
# python attendance_prediction.py 'region' 'infrastructure' 'residence'
# ===================================================================