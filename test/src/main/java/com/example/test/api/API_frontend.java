package com.example.test.api;

import java.io.IOException;
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
    public static String APIStatistics(@RequestParam(defaultValue = "Abruzzo") String region, @RequestParam(required = false) String date, @RequestParam(required = false) String infrastructure, @RequestParam(required = false) String residenceCountry) throws SQLException {
        ResultSet resultSet = DBInteraction.DBSelectFromRegion(region, date, infrastructure, residenceCountry);
        JSONArray result = ConvertToJSON.ResultSetToJSON(resultSet);
        return result.toString();
    }

    @GetMapping("/predictions")
    public static String APIPredictions(@RequestParam(defaultValue = "Abruzzo") String region, @RequestParam(required = false) String infrastructure, @RequestParam(required = false) String residenceCountry) throws IOException {
		String json = ExecutePythonAndCaptureOutput.ExecutePythonWithParameters("python", "pythonTestScripts\\testPython.py");
		return json;
  }
 
}
