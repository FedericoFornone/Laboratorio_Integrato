import pandas as pd

csv_path = 'https://raw.githubusercontent.com/FedericoFornone/Laboratorio_Integrato/fintech/DataSet/turismo_da_estero_in_italia.csv'

df = pd.read_csv(csv_path)

print(df)
