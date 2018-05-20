package com.cmpe275.termproject.resource;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import org.json.JSONObject;
import org.junit.*;
import org.junit.Assert.*;

//import static org.junit.*;


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
}
