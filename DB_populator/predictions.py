# Author: Daniele Budano
# i like python too
import requests

# this script was used to automatically populated the abruzzo_predictions table on the DB
# i created the table structure manually through phpmyadmin, then i used this script to...
# ...automatically fetch the values i needed for each parameter combination (through the java api i made), and populate the DB with that data

url = 'http://localhost:7790/predictionspython'

queryString = "INSERT INTO `abruzzo_predictions` (`Region`, `Infrastructure`, `ResidenceCountry`, `Covid?`, `Date`, `Arrivals`, `Attendance`) VALUES "

regionList = ['Abruzzo', 'Chieti', 'Teramo', 'Pescara', 'L\'Aquila']
infrastructureList = ['HOTELLIKE', 'OTHER']
residenceCountryList = ['Italia', 'Paesi esteri']
covidList = ['no', 'yes']

progressCounter = 1

for region in regionList:
    for infrastructure in infrastructureList:
        for residenceCountry in residenceCountryList:
            for covid in covidList:
                params = {'region': region, 'infrastructure': infrastructure, 'residenceCountry': residenceCountry, 'covid': covid}                
                arrivalsResponse = requests.get(url, params=params)
                arrivalsJson = arrivalsResponse.json()
                params = {'region': region, 'infrastructure': infrastructure, 'residenceCountry': residenceCountry, 'covid': covid, 'dataType': 'attendance'}  
                attendanceResponse = requests.get(url, params=params)
                attendanceJson = attendanceResponse.json()
                for row in arrivalsJson:
                    # prepared statements are technically cleaner then manually hacking together a query string like this and replacing the '
                    # but since this was a one-time operation performed by a team member, i didn't mind a quick and dirty solution
                    queryString += "\n('" + region.replace("'", "''") + "', '" + infrastructure + "', '" + residenceCountry + "', '" + covid + "', '" + row + "', " + str(arrivalsJson[row]) + ", " + str(attendanceJson[row]) + "),"
                    print(region + ", " + infrastructure + ", " + residenceCountry + ", " + covid + ", appended. " + str(progressCounter) + "/40 done.")
                # :)
                progressCounter-=-1
                
# remove the last comma
queryString = queryString[:-1]
with open("region_data_predictions.sql", "w") as f:
    f.write(queryString)
















