# Nomad - Fintech

This is the Fintech branch about the project named **Nomad**, it has the following areas:

- prediction model
- Covid prediction model
- Json generator
- Processing data
- Percentage Calulator
- Entry Data Analisys about Abruzzo region

---
## Index

-   [Configuration and technical characteristics](#configuration-and-technical-characteristics)
-   [Files and project structure](#files-and-project-structure)
-   [Features delivered](#features-delivered)
    - [Prediction models](#prediction-model)
    - [COVID Prediction models](#covid-prediction-model)
    - [JSON jenerator](#json-generator)
    - [Processing data](#processing-data)
    - [Percentage calculator](#percentage-calculator)
    - [Entry Data Analysis (EDA) Abruzzo](#entry-data-analysis-abruzzo)
    - [API documentation (.yaml)](https://github.com/FedericoFornone/Laboratorio_Integrato/blob/dev/Fintech/python_script/api_docs.yaml)
-   [Authors](#authors)
    - [Contacts](#contacts)

---

## Configuration and technical characteristics

The project is written entirely in `Python 3` using `skforecast` model to preedict the future data about Abruzzo.

You can easily check your _Python_ version using the command _"python --version"_ in the command line:
```shell
C:\> python --version
```
To run the models script you have to install `skforecast` package using the command _"pip install skforecast"_ in the command line.
```shell
C:\> pip install skforecast
```
The folder `/models` contains all the Machine Learning model files.

Every dataset file is contained inside the `./Data` folder.
Inside this folder there is also a `./final_data` folder that contain the final dataset cleaned and processed.

---

## Files and project structure

```
Files structure
    Data\
        fianl_data\
            abruzzo.csv
            abruzzo.json
            stranieri_abruzzo.csv
            stranieri_abruzzo.json
        estero.csv
        italia_abruzzo_stranieri.csv
    DataSet\
        annuo_abruzzo.csv
        dati_italia_abruzzo_annui.csv
        italia_abruzzo_stranieri.csv
        turismo_abruzzo.csv
        turismo_da_estero_in_italia.csv
    data_analysis\
        eda_estero.ipynb
        eda_province.ipynb
        percentage.ipynb
    models\
        arrivals_covid_prediction.py
        arrivals_prediction.py
        attendance_covid_prediction.py
        attendance_prediction.py
    python_script\
        api_conn.py
        api_docs.yaml
        json_generator.py
        processing_data.py
    .gitignore
    README.md
```

---

## Features delivered

Below are described all the features that were delivered in accordance with the project documentation.

---

### Prediction model

This Python program is a script that uses various libraries to perform time series forecasting on a dataset of _arrivals/attendance_. 

This Machine Learning model does not includes for the prediction the years involved in the COVID-19 pandemic.

The program first imports necessary libraries, including _sys, pandas, sklearn, and skforecast_. 

It then defines a function __make_mask()__ which creates masks of a dataframe based on certain parameters.

The __main()__ function is then defined, which takes in three parameters: _region, infrastructure, and residence_. 
    
The function starts by loading a CSV file and converting the _'Date'_ column to a datetime format. 

It then creates a new _'Year'_ and _'Month'_ column, and drops the first 280 rows of the dataframe because they contain annual values. 

The function then uses the __make_mask()__ function to create a new dataframe based on the input parameters, and resets the index.

The dataframe is then split into train and test set, with the train set containing all rows except the last 24 (the last 2 years that are the covid years), and the test set containing the last 24 rows. 

The function then creates a new dataframe with only the _'Arrivals'/'Attendance'_ and _'Date'_ columns from the train and test sets.

A __ForecasterAutoreg()__ model is then trained on the train set data, and predictions are made for the next 144 months (24 test months and 120 months to predict). 

The function then performs a grid search on the model, with parameters _'alpha'_ and _'lags'_ as the search parameters. 

The best model is then retrained and predictions are made again.

Finally, the predictions are printed in json format in order to allow the java backend to get the data.

---

### Covid prediction model

This Python program is a script that uses various libraries to perform time series forecasting on a dataset of _'arrivals'/'Attendance'_.

This Machine Learning model includes for the prediction the years involved in the COVID-19 pandemic. 

The program first imports necessary libraries, including _sys, pandas, sklearn, and skforecast_. 

It then defines a function __make_mask()__ which creates masks of a dataframe based on certain parameters.

The __main()__ function is then defined, which takes in three parameters: _region, infrastructure, and residence_. 

The function starts by loading a CSV file and converting the _'Date'_ column to a datetime format. 

It then creates new _'Year'_ and _'Month'_ column, and drops the first 280 rows of the dataframe because they contain annual values. 

The function then uses the __make_mask()__ function to create a new dataframe based on the input parameters, and resets the index.

The dataframe is then used as a train set. 

The function then creates a new dataframe with only the _'Arrivals/'Attendance'_ and _'Date'_ columns from the train set.

A __ForecasterAutoreg()__ model is then trained on the train set data, and predictions are made for the next 120 months. 

The function then performs a grid search on the model, with parameters _'alpha'_ and _'lags'_ as the search parameters. 

The best model is then retrained and predictions are made again.

Finally, the predictions are printed in json format in order to allow the java backend to get the data.

---

### JSON generator

This Python program is a script that converts a CSV file to a JSON file. 

The script starts by importing the necessary libraries, including _csv_ and _json_.

The program defines a function __csv_to_json()__ which takes in two parameters - _csv_path_ and _json_path_. 

The function reads the CSV file using the __csv.DictReader()__ method and stores the data in a list of dictionaries, with each dictionary representing a row in the CSV file. 

The function then opens the specified JSON file and writes the list of dictionaries in JSON format using the __json.dumps()__ method.

The script then calls the __csv_to_json()__ function with two hardcoded file paths: _csv_path_ and _json_path_, the csv_path is set to _"abruzzo.csv"_ and _json_path_ is set to _"abruzzo.json"_, which are located in the folder _"Data/final_data"_.

The final json file will contain the same data as the original csv file in json format.

---

### Processing data

This Python program is a script that reads a CSV file, performs data cleaning and transformation, and saves the cleaned data to a new CSV file.

The program first imports the necessary libraries, including _os_ and _pandas_.

The program defines a __main__ block which starts by setting the file path to the input CSV file, then reading the CSV file using __pd.read_csv()__ and filling any missing values with 0.

The program then drops certain columns from the dataframe using the __drop()__ method, sorts the dataframe based on certain columns using the __sort_values()__ method, and creates a copy of the dataframe that only contains rows where the _"Indicatori"_ column is equal to _"arrivi"_.

The program then renames the columns of the new dataframe, converts the _"TIME"_ column to a datetime format, and renames certain columns again.

It then creates a folder named _"Data"_ and saves the modified dataframe to a new CSV file in the folder. 

If the folder already exists, the program catches the error and continues.

The final dataframe contains columns _"Region", "Infrastructure", "ResidenceCountry", "Date", "Arrivals"_ and _"Attendance"_, where _Region, Infrastructure, ResidenceCountry, Date, Arrivals_ and _Attendance_ are the cleaned and transformed data.

---

### Percentage calculator

This program calculates the percentage of foreigners in Abruzzo among Italy.

It reads a csv file _'italia_abruzzo_stranieri.csv'_ using the _pandas_ library, it then performs several data cleaning and manipulation tasks on the dataframe, then it reads another csv _'estero.csv'_, performs a merge operation on the new dataframe and the _'estero.csv'_ based on the _'Date'_ column and performs some more data cleaning and manipulation and finally it creates a new csv _'final_data/turisti_stranieri_abruzzo.csv'_.

The program first imports the necessary libraries, including _pandas_, _numpy_ and _math.

It read the csv file _'italia_abruzzo_stranieri.csv'_ using the pandas function __'pd.read_csv()'__ and assign the resulting dataframe to a variable _'df'_.

Then the program check for unique values in the _'Region'_ and _'ResidenceCountry'_ columns and then display the result.

Using the __drop()__ function it drop the _'Infrastructure'_ column from the dataframe.

Create a new empty dataframe called _'new_df_' with the columns _'Date'_, _'percentage_arrivals'_ and _'percentage_attendance'_.

Iterate through the rows of the dataframe _'df'_ using a for loop to calculate the percentages of _'arrivals'_ and _'attendance'_ for the region of Abruzzo compared to the rest of Italy and adding them to the new dataframe _'new_df'_.

Then read the csv file _'estero.csv'_ using the pandas function __'pd.read_csv()'__ and assign the resulting dataframe to a variable _'df_estero'_ and perform a merge operation on _'df_estero'_ and _'new_df'_ dataframe on the _'Date'_ column using the pandas function __merge()__.

Iterate through the rows of the merged dataframe _'df_estero'_ using a for loop to calculate the percentages of arrivals and attendance for foreign visitors in Abruzzo.

Drop the _'percentage_attendance'_ and _'percentage_arrivals'_ columns from the dataframe _'df_estero'_, assign the value _'Abruzzo'_ to the _'Region'_ column in the dataframe.

Lastly it create a new csv file _'turisti_stranieri_abruzzo.csv'_ inside the folder _'./final_data'_ using the __to_csv()__ function of the dataframe _'df_estero'_ and set the _'index'_ parameter to False.

Note: The program assumes that the csv files 'italia_abruzzo_stranieri.csv' and 'estero.csv' are located in the 'Data' directory and that the final_data directory exist, otherwise you may need to adjust the path to the csv files.

---

### Entry Data Analysis Abruzzo

This program has made to explain to web developers how to show historical data to user.

It reads a csv file _'final_data/abruzzo.csv'_ using the _pandas_ library, it then performs several data cleaning and manipulation tasks on the dataframe, and creates several masks to filter and segregate the data. Then it uses these masks to plots the data using the _matplotlib_ and _seaborn_ libraries.

The program import the _pandas, matplotlib, numpy_ and _seaborn_ libraries using the following statements: _import pandas as pd_, _import matplotlib.pyplot as plt_, _import numpy as np_ and _import seaborn as sns_.

Read the csv file _'final_data/abruzzo.csv'_ using the pandas function __pd.read_csv()__ and assign the resulting dataframe to a variable _df_.

Then convert the _Date_ column of the dataframe to datetime object using the pandas function __pd.to_datetime()__ and create new columns _Year_ and _Month_ in the dataframe by extracting the year and month respectively from the _Date_ column using the __dt__ accessor of the pandas datetime object.

It define a function __make_mask()__ that takes in _dataframe, region, infrastructure_ and _residence_ as input and returns a filtered dataframe based on the input criteria and create several masks using the previous function.

The program then define a class __Plot__ with a constructor that takes in two integers as input and creates two arrays of zeroes of the size of the input integers.

It define a function __tracciato()__ within the class that creates a line plot of the input arrays _x_ and _y_ and takes in label and color as input.

Create an object of the class __Plot__ with _sizex_ and _sizey_ as input and call the __tracciato()__ function on the object using the masks created before and passing the respective data and labels.

The program then create, to make an example, a mask for data on the _Abruzzo_ region and for data in the year _2008_. 

After it calculates the mean number of _arrivals_ and _attendance_ for each month of the year _2008_. 

These means are stored in lists and plotted as a bar chart using the _matplotlib_ library. 

The chart shows the average number of _arrivals_ and _attendance_ for each month of the year _2008_ in the _Abruzzo_ region.

Note: The program assumes that the csv file 'final_data/abruzzo.csv' is located in the 'Data' directory and the 'chat' directory exist, otherwise you may need to adjust the path to the csv file and the directory where the csv files are being saved.

---

## Authors

-   Riccardo Rapelli, Fintech software developer


### Contacts

- riccardo.rapelli@edu.itspiemonte.it
