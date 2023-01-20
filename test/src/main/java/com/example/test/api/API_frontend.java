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

    @GetMapping("/predictions")
    public static String APIPredictions(@RequestParam(defaultValue = "arrivals") String dataType, @RequestParam(defaultValue = "Abruzzo") String region, @RequestParam(defaultValue = "HOTELLIKE") String infrastructure, @RequestParam(defaultValue = "Italia") String residenceCountry) throws IOException {
        String pythonStdOut = new String();
        if (dataType.equals("attendance")) {
            pythonStdOut = ExecutePythonAndCaptureOutput.ExecutePythonWithParameters("python", "pythonScripts\\attendance_prediction.py", region, infrastructure, residenceCountry);
        }
        else { // defaulting to arrivals even is misspelled
            pythonStdOut = ExecutePythonAndCaptureOutput.ExecutePythonWithParameters("python", "pythonScripts\\arrivals_prediction.py", region, infrastructure, residenceCountry);
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
        System.out.println(result);
        return result;
    }
 
}
