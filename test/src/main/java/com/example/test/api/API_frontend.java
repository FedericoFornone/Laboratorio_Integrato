package com.example.test.api;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.checkerframework.common.reflection.qual.GetClass;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.test.utility.ConvertToJSON;
import com.example.test.utility.DBInteraction;

@RestController
public class API_frontend {

    @GetMapping("/statistics")
    public static String APIStatistics() throws SQLException {
        ResultSet resultSet = DBInteraction.DBSelectFromRegion("Abruzzo");
        JSONArray result = ConvertToJSON.ResultSetToJSON(resultSet);
        return result.toString();
    }
}
