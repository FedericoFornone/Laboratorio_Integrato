package com.example.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.test.utility.DBInteraction;

@SpringBootApplication
public class TestApplication {

	public static void main(String[] args) {
		SpringApplication.run(TestApplication.class, args);
		// DBInteraction.DBTest();
	}

}
