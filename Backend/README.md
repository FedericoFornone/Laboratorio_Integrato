# Backend NOMAD

- [Backend NOMAD](#backend-nomad)
  - [Configuration and technical characteristics](#configuration-and-technical-characteristics)
  - [Files and project structure](#files-and-project-structure)
  - [Database configuration](#database-configuration)
  - [Utility](#utility)
  - [API and endpoints](#api-and-endpoints)
  - [Deploy on server](#deploy-on-server)
  - [Authors](#authors)
    - [Contacts](#contacts)
  - [Changelog and version history](#changelog-and-version-history)

---
## Configuration and technical characteristics
The backend is written entirely in `Java` using version 2.7.7 of `SpringBoot`.  
As `JDK` we used version 11, but we also tested with version 17.

Dependencies used:
- spring-boot-starter-web
- spring-boot-starter-data-jpa
- h2
- spring-boot-starter-test
- mariadb-java-client
- spring-boot-devtools
- json

---
## Files and project structure

```
Files structure
    main/
        java/com/example/test
            api/
                API_frontend.java -> frontend endpoints
            utility/
                ConvertToJSON.java -> convert in a JSON format string
                DBInteraction.java -> connect to the database
                ExecutePythonAndCaptureOutput.java -> to populate the DB with predicted data automatically
            TestApplication.java
        resources/ -> frontend
            
```

---
## Database configuration
A `MariaDB` database was used.
Was imported local with `XAMPP` for `PHPMyAdmin`.

There are two tables in the database: a table for **static data** ordered with a python script, and a table with **predictive data**.

This class was used to connect to the database
```java
public class DBInteraction {    
```
<dl>
  <dd>
    Function in DBInteraction

  - **DBSelectFromRegion()** =  in this function, with the parameters of the filters on the front side, a query is selected from the **static** data table and returns the filtered data.
  - **DBSelectFromRegionPredictions()** = in this function, with the parameters of the filters on the front side, a query is selected from the table of **predictive** data and returns the filtered data.
  </dd>
</dl>


---
## Utility
Below the classes and functions created for the backend **logic**.

This class was created to convert the results to JSON format.

```java
public class ConvertToJSON{    
```

<dl>
  <dd>
    Function in ConvertToJSON

  - **ResultSetToJSON()** =  this function is called when you need to convert the results, for example returned by python, in a JSON format string.
  </dd>
</dl>

This class is unused in the final project during runtime, we used this to populate the DB with predicted data automatically.

```java
public class ExecutePythonAndCaptureOutput {   
```

<dl>
  <dd>
    Function in ExecutePythonAndCaptureOutput

  - **ExecutePython()** = this executes a python script without any additional parameters. This utility method was never used.
  - **ExecutePythonWithParameters()** = this function should only be called if multiple parameters are needed to execute a python script. The first parameter should just be the string “python”.  The second parameters should be the path to the python script. The next parameters should be the parameters to be passed to the python script, for example: 
  _ExecutePythonWithParameters("python", "pythonScripts\\attendance_covid_prediction.py", region, infrastructure, residenceCountry);_
  </dd>
</dl>

---
## API and endpoints
APIs and endpoints were created to communicate only with the frontend side. Python data is all saved on the database.

All endpoints have been created in this class.
```java
public class API_frontend {   
```
<dl>
  <dd>
    The different type of endpoints

  - **APIStatistics** = this endpoint passes all static data on the database.
  - **APIPredictionsPython** = this endpoint called a python script at runtime to generate the expected values. After deciding to also save predictions data in the database this endpoint was used only for the automatic population of the database.
  - **APIPredictions** = this endpoint selects the data required by the database.
  </dd>
</dl>

---
## Deploy on server
To deploy a SpringBoot application: 
- Bring to the server, with an FTP application (filezilla for example), the file . war generated
- run with the command "java -jar [namewar]"
---
## Authors
- Daniele Budano, Backend System Integrator
- Federico Fornone, Backend System Integrator
- Alessia Rizzo, Backend System Integrator

### Contacts
- daniele.budano@edu.itspiemonte.it
- federico.fornone@edu.itspiemonte.it
- alessia.rizzo@edu.itspiemonte.it
---
## Changelog and version history

You can check the git history of this project from our repository:
[Nomad Project](https://github.com/FedericoFornone/Laboratorio_Integrato).


