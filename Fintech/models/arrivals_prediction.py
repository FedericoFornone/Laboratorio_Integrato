# importing the necessary libraries
import sys
import pandas as pd
from sklearn.linear_model import Ridge
from sklearn.preprocessing import StandardScaler
from skforecast.ForecasterAutoreg import ForecasterAutoreg
from skforecast.model_selection import grid_search_forecaster


# function that creates masks of a dataframe starting
# from the dataframe and the parameters to be isolated.
def make_mask(df: pd.DataFrame, region: str, infrastructure: str, residence: str):
    df = df[(df['Region'] == region) & (df['Infrastructure'] == infrastructure) & (df['ResidenceCountry'] == residence)]
    return df


def main(region, infrastructure, residence):
    # Open the csv file
    input_df = pd.read_csv('https://raw.githubusercontent.com/FedericoFornone/Laboratorio_Integrato/fintech/Data/final_data/abruzzo.csv')

    # Set the column 'Date' as a datetime
    input_df.Date = pd.to_datetime(input_df.Date)

    input_df['Year'] = input_df.Date.dt.year
    input_df['Month'] = input_df.Date.dt.month
    # Drop of the first 280 rows of the dataframe
    input_df = input_df[280:]

    # Create the mask using the input parameters in the function written before
    df = make_mask(input_df, region, infrastructure, residence)
    # Reset the index of the dataframe
    df.reset_index(inplace=True)
    # Drop the column of the old index
    df = df.drop(['index'], axis=1)

    # Set the train dataframe with all the dataframe except the last 24 rows (the last 2 years)
    df_train = df[:-24]
    # Set the test dataframe with the last 24 rows of the dataframe (the last 2 years)
    df_test = df[-24:]

    # Get only the 'Arrivals' and 'Date' columns from the train dataframe
    df_train_arrivals = df_train[['Arrivals', 'Date']]
    # Get only the 'Arrivals' and 'Date' columns from the test dataframe
    df_test_arrivals = df_test[['Arrivals', 'Date']]

    # the 24 test months and 120 months that we need to predict
    steps = 24 + 120

    # First model training
    forecaster = ForecasterAutoreg(
        regressor=Ridge(),
        transformer_y=StandardScaler(),
        lags=30  # The time frame that defines the rows of the features matrix
    )

    # Set the 'Date' column as DatetimeIndex of the train dataset
    df_train_arrivals.index = pd.DatetimeIndex(df_train_arrivals.Date, freq='MS')

    # Fitting of the model
    forecaster.fit(y=df_train_arrivals['Arrivals'])

    # Predictions
    df_pred = forecaster.predict(steps=steps)

    # Set the parameters to use in the grid search
    param_grid = {'alpha': [0.0001, 0.001, 0.01, 0.1, 1., 10.]}

    # Set the lags to use in the grid search
    lags_grid = [10, 20, 30, 40]

    # Grid search
    grid_search = grid_search_forecaster(
        forecaster=forecaster,
        y=df_train_arrivals['Arrivals'],
        param_grid=param_grid,
        lags_grid=lags_grid,
        steps=steps,
        metric='mean_absolute_error',
        initial_train_size=int(len(df_train) * 0.5),
        return_best=True,
        verbose=False
    )

    # Second model training after the grid search
    fa_autoreg = ForecasterAutoreg(regressor=Ridge(alpha=0.001),
                                   transformer_y=StandardScaler(),
                                   lags=20)

    fa_autoreg.fit(y=df_train_arrivals['Arrivals'])

    # Predictions
    fa_pred = fa_autoreg.predict(steps=steps)

    # Replacement of all negative results in the predictions
    fa_pred[fa_pred < 0] = 0

    # Get only the 120 predicted months
    prediction = fa_pred[-120:]

    print('data start')
    # Print of the predicted data converted to json format the prediction serie
    print(prediction.to_json(orient="index", date_format='iso'))


if __name__ == '__main__':
    main(str(sys.argv[1]), str(sys.argv[2]), str(sys.argv[3]))

# ===================================================================
# To run the script write in the terminal:
# !pip install skforecast
# python arrivals_prediction.py 'region' 'infrastructure' 'residence'
# ===================================================================
