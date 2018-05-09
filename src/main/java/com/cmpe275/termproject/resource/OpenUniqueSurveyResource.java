package com.cmpe275.termproject.resource;

import com.cmpe275.termproject.model.OpenUniqueSurveyEntity;
import com.cmpe275.termproject.model.SurveyEntity;
import com.cmpe275.termproject.repository.*;
import com.cmpe275.termproject.view.Survey;
import com.fasterxml.jackson.annotation.JsonView;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/survey/openUniqueSurvey/emailRegister")
public class OpenUniqueSurveyResource {

    @Autowired
    SurveyRepository surveyRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    OptionsRepository optionsRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ClosedSurveyRepository closedSurveyRepository;

    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    OpenSurveyRepository openSurveyRepository;

    @Autowired
    OpenUniqueSurveyRepository openUniqueSurveyRepository;

    @Transactional
    @JsonView({Survey.summary.class})
    @PostMapping
    public ResponseEntity<?> registerEmail(@RequestBody Map<String, Object> payload) throws JSONException {

        // Fetching the payload
        JSONObject jsonObject = new JSONObject(payload);
        JSONObject current_survey = jsonObject.getJSONObject("current_survey");
        UUID uuid = UUID.randomUUID();

        System.out.println("jsonObject:"+jsonObject);

        SurveyEntity surveyEntity = surveyRepository.findOne(current_survey.getInt("surveyId"));
        OpenUniqueSurveyEntity openUniqueSurveyEntity = new OpenUniqueSurveyEntity();

        openUniqueSurveyEntity.setSurveyId(surveyEntity);
        openUniqueSurveyEntity.setUuid(String.valueOf(uuid));
        openUniqueSurveyEntity.setEmailId(jsonObject.getString("usreid"));
        openUniqueSurveyEntity.setInvitation_link("http://localhost:8080/" + surveyEntity.getSurveyId() + "/" + String.valueOf(uuid));
        openUniqueSurveyEntity.setIslinkused(0);

        openUniqueSurveyRepository.save(openUniqueSurveyEntity);

        // Send Email

        final String username = "infosurveyape275@gmail.com";
        final String password = "qwerty123asdf";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("infosurveyape275@gmail.com"));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(jsonObject.getString("usreid")));
            message.setSubject("Please verify your email address");
            message.setText( "Hi "+jsonObject.getString("usreid")+ ","+  System.lineSeparator() +"Thank you for registering for the survey!"+ System.lineSeparator() +"Follow this Link to take the survey : "+System.lineSeparator()+ "http://localhost:3000/survey/"+current_survey.getInt("surveyId")+"/"+String.valueOf(uuid));

            Transport.send(message);

            System.out.println("Done");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        return new ResponseEntity("OK", HttpStatus.OK);
    }
}
