package com.cmpe275.termproject.helperClasses;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class BadRequest {

    private int errorCode;

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    private String message;

    public BadRequest(){}

    public BadRequest(int errorCode, String message) {
        this.errorCode = errorCode;
        this.message = message;
    }

    public static BadRequest createBadRequest(int code, String msg){
        BadRequest badRequest =new BadRequest();
        badRequest.setErrorCode(code);
        badRequest.setMessage(msg);
        return badRequest;
    }
}