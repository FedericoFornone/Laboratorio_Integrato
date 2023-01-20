import sys

json = '[{"Attendance":4479655,"Arrivals":1205426,"ResidenceCountry":"Italia","Infrastructure":"HOTELLIKE","Region":"Abruzzo","Date":"2008"},{"Attendance":643212,"Arrivals":149736,"ResidenceCountry":"Paesi esteri","Infrastructure":"HOTELLIKE","Region":"Abruzzo","Date":"2008"}'
if len(sys.argv) > 1:
    testParameter = sys.argv[1]
    print(testParameter)
else:
    print(json)
