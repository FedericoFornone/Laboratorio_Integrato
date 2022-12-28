import os
import pandas as pd


if __name__ == '__main__':
    # path = 'https://raw.githubusercontent.com/FedericoFornone/Laboratorio_Integrato/fintech/DataSet/turismo_da_estero_in_italia.csv'
    path = '../DataSet/turismo_abruzzo.csv'
    df = pd.read_csv(path, sep=";").fillna(0)
    df = df[df["Territorio"].isin(["Abruzzo", "Chieti", "L'Aquila", "Teramo", "Pescara"])][df["Indicatori"].isin(["arrivi ", "presenze"])][df["TIPO_ALLOGGIO2"].isin(["HOTELLIKE", "OTHER"])][df["Paese di residenza dei clienti"].isin(["Italia", "Paesi esteri"])]
    df.drop(["ITTER107", "TIPO_DATO7", "Correzione", "CORREZ", "ATECO_2007", "Ateco 2007", "ISO", "Seleziona periodo", "Tipologia di esercizio", "Flags", "Flag Codes"], axis=1, inplace=True)

    df.sort_values(by=["TIME", "Territorio", "Indicatori", "TIPO_ALLOGGIO2", "Paese di residenza dei clienti"], ascending=True, inplace=True)

    new_df = df[df["Indicatori"] == "arrivi "].copy()
    new_df.rename(columns={"Value": "arrivi"}, inplace=True)
    new_df["presenze"] = df[df["Indicatori"] == "presenze"]["Value"].to_numpy()
    new_df.drop("Indicatori", axis=1, inplace=True)

    new_df["TIME"] = pd.to_datetime(new_df["TIME"], infer_datetime_format=True)

    try:
        os.mkdir("..\\Data")
    except OSError as error:
        print(error)

    new_df.to_csv("../Data/province.csv", index=False)