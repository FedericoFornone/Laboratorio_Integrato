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

public class DBInteraction {

    public static void DBTest() {
    // Trying to connect to a DB on a remote server
    // Testing this from my laptop results in getting denied permission to connect to this MariaDB server
    try {
        Connection connection = DriverManager.getConnection("jdbc:mariadb://18.102.24.178:3306/Region_Data","root", "87!tyIlp?1");
        try (PreparedStatement statement = connection.prepareStatement("""
            SELECT TypeOfInfrastructure, CountryOfOrigin
            FROM Abruzzo
        """)) {
        ResultSet resultSet = statement.executeQuery();
        while (resultSet.next()) {
            String val1 = resultSet.getString("TypeOfInfrastructure"); // using column name
            System.out.println(val1);
        }
        }
        catch (Exception e) {
            System.out.println(e.toString());
        }
    }
    catch (Exception e){
        System.out.println("Error while conntecting to DB: " + e.toString());
    }








}

}