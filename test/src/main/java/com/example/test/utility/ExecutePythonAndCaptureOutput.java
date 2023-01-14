package com.example.test.utility;

import java.io.*;

public class ExecutePythonAndCaptureOutput {
    
    public static String ExecutePython(String scriptFilePath) throws IOException {
        ProcessBuilder pb = new ProcessBuilder().command("python", scriptFilePath)
        .redirectErrorStream(true);
        Process p = pb.start();

        BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
        StringBuilder builder = new StringBuilder();
        String line = null;
        while (((line = reader.readLine()) != null)) {
            builder.append(line);
            builder.append(System.getProperty("line.separator"));
        }
        String result = builder.toString();
        return result;
    }

    // this function should only be called if multiple parameters are needed to execute a python script
    // the first parameter should just be the string "python"
    // the second parameter should be the path to the python script
    // the next parameters should be the parameters to be passed to the python script
    // for example: ExecutePythonWithParameters("python", "path/to/file.py", "long-term")
    public static String ExecutePythonWithParameters(String... args) throws IOException {
        if (args[0] != "python") {
            return "Internal error, first parameter wasn't python";
        }
        ProcessBuilder pb = new ProcessBuilder().command(args)
        .redirectErrorStream(true);
        Process p = pb.start();

        BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
        StringBuilder builder = new StringBuilder();
        String line = null;
        while (((line = reader.readLine()) != null)) {
            builder.append(line);
            builder.append(System.getProperty("line.separator"));
        }
        String result = builder.toString();
        return result;
    }
}
