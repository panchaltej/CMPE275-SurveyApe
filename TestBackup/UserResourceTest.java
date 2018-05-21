package com.cmpe275.termproject.resource;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import org.json.JSONObject;
import org.junit.*;


public class UserResourceTest {

    @org.junit.Test
    public void checkLogin() {

        try {
            HttpResponse<JsonNode> jsonResponse = Unirest.post("http://localhost:8080/login")
                    .header("accept", "application/json")
                    .field("email", "divyank.shukla@sjsu.edu")
                    .field("password", "temp")
                    .asJson();

            JSONObject res = jsonResponse.getBody().getObject();
            Assert.assertEquals("divyank.shukla@sjsu.edu", res.get("email_id"));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @org.junit.Test
    public void FailedLogin() {

        try {
            HttpResponse<JsonNode> jsonResponse = Unirest.post("http://localhost:8080/login")
                    .header("accept", "application/json")
                    .field("email", "divyank.shukla@sjsu.edu")
                    .field("password", "random")
                    .asJson();

            JSONObject res = jsonResponse.getBody().getObject();
            System.out.println(res);
            Assert.assertEquals(208, jsonResponse.getStatus());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @org.junit.Test
    public void Signup() {

        try {
            HttpResponse<JsonNode> jsonResponse = Unirest.post("http://localhost:8080/signup")
                    .header("accept", "application/json")
                    .field("email", "divyank68@mailinator.com")
                    .field("password", "random")
                    .field("firstName","check")
                    .asJson();

            JSONObject res = jsonResponse.getBody().getObject();
            System.out.println(res);
            Assert.assertEquals(200, jsonResponse.getStatus());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @org.junit.Test
    public void closeSurvey() {
        try {
            HttpResponse<JsonNode> jsonResponse = Unirest.post("http://localhost:8080/survey/closesurvey")
                    .header("accept", "application/json")
                    .body("{'survey_id':'7'}") //invalid close survey
                    .asJson();

            JSONObject res = jsonResponse.getBody().getObject();
            Assert.assertEquals(415, jsonResponse.getStatus());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    @org.junit.Test
    public void allopenuniquesurveys() {
        try {
            HttpResponse<JsonNode> jsonResponse = Unirest.get("http://localhost:8080/survey/allopenuniquesurveys")
                    .header("accept", "application/json")
                    .asJson();

            JSONObject res = jsonResponse.getBody().getObject();
            Assert.assertEquals(200, jsonResponse.getStatus());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
