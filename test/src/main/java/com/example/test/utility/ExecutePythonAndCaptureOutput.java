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
}
