package com.example.test.utility;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.json.JSONArray;
import org.json.JSONObject;

public class ConvertToJSON {

    public static JSONArray ResultSetToJSON(ResultSet resultSet) throws SQLException {
        ResultSetMetaData md = resultSet.getMetaData();
        int numCols = md.getColumnCount();
        List<String> colNames = IntStream.range(0, numCols)
        .mapToObj(i -> {
            try {
                return md.getColumnName(i + 1);
            } catch (SQLException e) {
                e.printStackTrace();
                return "?";
            }
        })
        .collect(Collectors.toList());

        JSONArray result = new JSONArray();
        while (resultSet.next()) {
            JSONObject row = new JSONObject();
            colNames.forEach(cn -> {
                try {
                    row.put(cn, resultSet.getObject(cn));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
            result.put(row);
        }
        return result;
    }
}