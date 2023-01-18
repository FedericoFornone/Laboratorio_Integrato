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
    
    public static ResultSet DBSelectFromRegion(String region, String date, String dateType, String infrastructure, String residenceCountry) throws SQLException {
            Connection connection = DriverManager.getConnection("jdbc:mariadb://localhost/region_data","root", "");

            // CONSTANT: this value will never change and is used when checking the length of the date field when making queries to the DB
            final int dateYearlyLength = 4;

            // this query has been modified to allow for multiple filters at the same time
            String query = "SELECT * FROM Abruzzo WHERE Region = ?";
            int parameterCount = 2;
            int indexOfDate = 0;
            int indexOfInfrastructure = 0;
            int indexOfResidenceCountry = 0;
            boolean isDatePresent = false;
            boolean isInfrastructurePresent = false;
            boolean isResidenceCountryPresent = false;
            boolean isDateTypeMonthly = false;

            // first we have to check if a parameter has been passed and build the query string accordingly
            // since the binding has to be done after setting the prepared statement, we have to memorize the index position here, and bind later

            // before any of that though, we have to check if the date type is yearly or monthly because that is gonna change the query for the date
            if (dateType != null && dateType.equals("monthly")) {
                // we are using the length of the date string to determine whether a row is referring to yearly or monthly data
                query += " AND LENGTH(Date) > " + dateYearlyLength;
                isDateTypeMonthly = true;
            }
            else { // date type defaults to yearly even if the parameter is misspelled or invalid
                query += " AND LENGTH(Date) <= " + dateYearlyLength;
            }
            if (date != null) {
                if (isDateTypeMonthly) {
                    query += " AND Date LIKE ?";
                }
                else {
                    query += " AND Date = ?";
                }                
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
                if (isDateTypeMonthly) {
                    // if the date type is monthly, there will be a LIKE statement in the query here
                    // so we will append a % sign to look for all date fields that start with the requested date
                    // this is part of MySQL's built-in prepared statements
                    date += "%";
                }
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
