package com.example.test.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin // This enables api calls from machines other than the one that allocated the resources. Might not want this enabled.
public class API_fintech {

    // This whole API class is unnecessary in the end
    
    @GetMapping("/test")
    public static void APITest() {
        System.out.println("This is a test API Endpoint.");
    }

    @GetMapping("/testparam")
    public static void APITestParam(@RequestParam String testString) {
        System.out.println("String that got passed is: " + testString);
    }

    // For Federico and Alessia: you can make API endpoints here, just like those test endpoint above.
    // First you have to specify your endpoint. You can do this by typing @GetMapping("/enpoint"), and replacing the /endpoint with the name of your endpoint.
    // Then you just write a function that does whatever you need it to. You can specify the values that will have to be passed to the function with @RequestParam.
}
