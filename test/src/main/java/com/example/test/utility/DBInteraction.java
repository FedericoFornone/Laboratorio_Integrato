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
    
    public static ResultSet DBSelectFromRegion(String region) {
        try {
            Connection connection = DriverManager.getConnection("jdbc:mariadb://18.102.24.178:3306/Region_Data","root", "87!tyIlp?1");
            try (PreparedStatement statement = connection.prepareStatement("""
                SELECT *
                FROM Abruzzo
                """))
            { // this will be a prepared statement that subs out the ? with region, in the end
                //statement.setString(1, "Abruzzo");
                ResultSet resultSet = statement.executeQuery();
                return resultSet;

            }
            catch (Exception e) {
                System.out.println(e.toString());
                ResultSet resultSet = null;
                return resultSet;
            }
        }
        catch (Exception e){
            System.out.println("Error while conntecting to DB: " + e.toString());
            ResultSet resultSet = null;
            return resultSet;
        } 
    }
}
