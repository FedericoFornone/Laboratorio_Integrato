package com.example.test.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.checkerframework.common.reflection.qual.GetClass;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.test.utility.ConvertToJSON;
import com.example.test.utility.DBInteraction;
import com.example.test.utility.ExecutePythonAndCaptureOutput;

@RestController
@CrossOrigin // This enables api calls from machines other than the one that allocated the resources. Might not want this enabled.
public class API_frontend {

    @GetMapping("/statistics")
    public static String APIStatistics(@RequestParam(defaultValue = "Abruzzo") String region, @RequestParam(required = false) String date, @RequestParam(required = false) String dateType, @RequestParam(required = false) String infrastructure, @RequestParam(required = false) String residenceCountry) throws SQLException {
        ResultSet resultSet = DBInteraction.DBSelectFromRegion(region, date, dateType, infrastructure, residenceCountry);
        JSONArray result = ConvertToJSON.ResultSetToJSON(resultSet);
        return result.toString();
    }

    // this endpoint calls a python script at runtime to generate the predicted values
    // we originally used this for the frondend directly, but it made loading times extremely small
    // so we switched to a /predictions endpoint that just fetches data from the DB that has been populated beforehand
    // we still used this endpoint to automatically populate the DB with DB_populator/predictions.py
    @GetMapping("/predictionspython")
    public static String APIPredictionsPython(@RequestParam(required = false) String dataType, @RequestParam(defaultValue = "Abruzzo") String region, @RequestParam(defaultValue = "HOTELLIKE") String infrastructure, @RequestParam(defaultValue = "Italia") String residenceCountry, @RequestParam(required = false) String covid) throws IOException {
        String pythonStdOut = new String();
        if (dataType != null && dataType.equals("attendance")) {
            if (covid != null && covid.equals("yes")) {
                pythonStdOut = ExecutePythonAndCaptureOutput.ExecutePythonWithParameters("python", "pythonScripts\\attendance_covid_prediction.py", region, infrastructure, residenceCountry);
            }
            else {
                pythonStdOut = ExecutePythonAndCaptureOutput.ExecutePythonWithParameters("python", "pythonScripts\\attendance_prediction.py", region, infrastructure, residenceCountry);
            }
            
        }
        else { // defaulting to arrivals even is misspelled
            if (covid != null && covid.equals("yes")) {
                pythonStdOut = ExecutePythonAndCaptureOutput.ExecutePythonWithParameters("python", "pythonScripts\\arrivals_covid_prediction.py", region, infrastructure, residenceCountry);
            }
            else {
                pythonStdOut = ExecutePythonAndCaptureOutput.ExecutePythonWithParameters("python", "pythonScripts\\arrivals_prediction.py", region, infrastructure, residenceCountry);
            } 
        }
        // the python standard output also contains a bunch of junk that we don't care about
        // to solve this, there is a print of the "data start" string to indicate that the data we want to collect is about to start
        // we discard everything before and including that string
        BufferedReader bufReader = new BufferedReader(new StringReader(pythonStdOut));
        String result = new String();
        String line=null;
        boolean startReading = false;
        while( (line=bufReader.readLine()) != null ){
            if (startReading) {
                result += line;
                result += System.getProperty("line.separator");
            }
            if (startReading == false && line.equals("data start")) {
                startReading = true;
            }
        }
        // now we need to work on the data output from python a little bit more.
        // firstly, the date field has these unnecessary "T00:00:00.000" strings that we will simply remove
        result = result.replace("T00:00:00.000", "");
        // then, the value field is a float value, so we will want to round this down
        // i could use a json library to parse though it, isolate every value field, and round it down, but i chose the lazier solution of...
        // ...simply using a regex to truncate the decimal values
        // it looks for a "." followed by any string and a lookahead delimiter "," (for most values} or "}" (for the last value)
        // and removes it all
        // this does mean that results are effectively rounded down
        result = result.replaceAll("(\\.)(.*?)(?=,|})", "");
        return result;
    }

    @GetMapping("/predictions")
    public static String APIPredictions(@RequestParam(defaultValue = "Abruzzo") String region, @RequestParam(required = false) String infrastructure, @RequestParam(required = false) String residenceCountry, @RequestParam(required = false) String covid) throws SQLException {
        ResultSet resultSet = DBInteraction.DBSelectFromRegionPredictions(region, infrastructure, residenceCountry, covid);
        JSONArray result = ConvertToJSON.ResultSetToJSON(resultSet);
        return result.toString();
    }
 
}
