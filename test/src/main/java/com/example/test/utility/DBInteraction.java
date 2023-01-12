package com.example.test.utility;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

public class DBInteraction {
    
    public static ResultSet DBSelectFromRegion(String region, String date, String infrastructure, String residenceCountry) throws SQLException {
            Connection connection = DriverManager.getConnection("jdbc:mariadb://18.102.24.178:3306/Region_Data","root", "87!tyIlp?1");

            // this query has been modified to allow for multiple filters at the same time
            String query = "SELECT * FROM Abruzzo WHERE Region = ?";
            int parameterCount = 2;
            int indexOfDate = 0;
            int indexOfInfrastructure = 0;
            int indexOfResidenceCountry = 0;
            boolean isDatePresent = false;
            boolean isInfrastructurePresent = false;
            boolean isResidenceCountryPresent = false;

            // first we have to check if a parameter has been passed and build the query string accordingly
            // since the binding has to be done after setting the prepared statement, we have to memorize the index position here, and bind later
            if (date != null) {
                query += " AND Date = ?";
                isDatePresent = true;
                indexOfDate = parameterCount;
                parameterCount++;
            }
            if (infrastructure != null) {
                query += " AND Infrastructure = ?";
                isInfrastructurePresent = true;
                indexOfInfrastructure = parameterCount;
                parameterCount++;
            }
            if (residenceCountry != null) {
                query += " AND ResidenceCountry = ?";
                isResidenceCountryPresent = true;
                indexOfResidenceCountry = parameterCount;
                parameterCount++;
            }
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, region);
            // bind everything that is present
            if (isDatePresent) {
                statement.setString(indexOfDate, date);
            }
            if (isInfrastructurePresent) {
                statement.setString(indexOfInfrastructure, infrastructure);
            }
            if (isResidenceCountryPresent) {
                statement.setString(indexOfResidenceCountry, residenceCountry);
            }
            ResultSet resultSet = statement.executeQuery();
            return resultSet;
    }
}
