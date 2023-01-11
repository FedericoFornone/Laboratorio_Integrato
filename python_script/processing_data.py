import os
import pandas as pd


if __name__ == '__main__':
    path = '../DataSet/turismo_abruzzo.csv'
    df = pd.read_csv(path, sep=";", low_memory=False).fillna(0)

    df.drop(["ITTER107", "TIPO_DATO7", "CORREZ", "Correzione", "Tipologia di esercizio", "ATECO_2007", "Ateco 2007", "ISO", "Seleziona periodo", "Flag Codes", "Flags"], axis=1, inplace=True)

    df.sort_values(by=["TIME", "Territorio", "Indicatori", "TIPO_ALLOGGIO2", "Paese di residenza dei clienti"], ascending=True, inplace=True)

    new_df = df[df["Indicatori"] == "arrivi "].copy()
    new_df.rename(columns={"Value": "arrivi"}, inplace=True)
    new_df["presenze"] = df[df["Indicatori"] == "presenze"]["Value"].to_numpy()
    new_df.drop("Indicatori", axis=1, inplace=True)

    new_df["TIME"] = pd.to_datetime(new_df["TIME"], infer_datetime_format=True, format='%Y%m%d')

    new_df.rename(columns={'Territorio': 'Region', 'TIPO_ALLOGGIO2': 'Infrastructure',
                              'Paese di residenza dei clienti': 'ResidenceCountry', 'TIME': 'Date',
                              'arrivi': 'Arrivals', 'presenze': 'Attendance'}, inplace=True)
    #try:
    #    os.mkdir("..\\Data")
    #except OSError as error:
    #    print(error)

    new_df.to_csv("../Data/final_data/province.csv", index=False)