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

    // I have no idea how to actually connect to a remote DB at the moment
    Connection connection = DriverManager.getConnection(
        "jdbc:mariadb://localhost:3306/Region_Data",
        "user", "password"
    );

}