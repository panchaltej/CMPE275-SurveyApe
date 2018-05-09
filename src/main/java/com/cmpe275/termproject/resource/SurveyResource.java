package com.cmpe275.termproject.resource;

import com.cmpe275.termproject.helperClasses.BadRequest;
import com.cmpe275.termproject.helperClasses.SavedResponse;
import com.cmpe275.termproject.model.*;
import com.cmpe275.termproject.repository.*;
import com.cmpe275.termproject.view.Survey;
import com.cmpe275.termproject.view.SurveyResponse;
import com.fasterxml.jackson.annotation.JsonView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.SocketUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.UUID;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/survey")
public class SurveyResource {

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
    OpenSurveyRepository openSurveyRepository;

    @Autowired
    OpenUniqueSurveyRepository openUniqueSurveyRepository;

    @Transactional
    @JsonView({SurveyResponse.summary.class})
    @GetMapping(value = "/{surveyId}/{uuid}")
    public ResponseEntity<?> sendSavedResponse(@PathVariable("surveyId") Integer surveyId,
                                               @PathVariable("uuid") String uuid) throws JSONException {
        // Update the end time logic
//        System.out.println("surveyRepository.findOne(surveyId).getEndTime():"+surveyRepository.findOne(surveyId).getEndTime());
//        Date tempdate=surveyRepository.findOne(surveyId).getEndTime();
//        //System.out.println(tempdate);
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");
//        System.out.println(sdf.format(new Date()));
//        try {
//            System.out.println(sdf.parse(sdf.format(new Date()).toString()).after(sdf.parse(tempdate.toString())));
//        }
//        catch (Exception ex) {
//            System.out.println(ex);
//        }

        if(surveyRepository.findOne(surveyId).getEndTime() == null || new Date().before(surveyRepository.findOne(surveyId).getEndTime())){
            SavedResponse savedResponse = new SavedResponse();

            savedResponse.setSurveyId(surveyId);

            System.out.println("uuid:"+uuid);
            System.out.println("surveyId:"+surveyId);
            System.out.println("openUniqueSurveyRepository.findOneByUuid(uuid);"+openUniqueSurveyRepository.findOneByUuid(uuid));

            SurveyEntity s = surveyRepository.findOne(surveyId);
            int userId;
            String emailId="";

            String type = s.getSurvey_type();
            UserEntity userEntity = new UserEntity();
            System.out.println("userEntity:"+userEntity);
            System.out.println("type:"+type);
            if(type.equals("O")){
                OpenUniqueSurveyEntity openUniqueSurveyEntity = openUniqueSurveyRepository.findOneByUuid(uuid);
                userEntity = userRepository.findOneByEmail(openUniqueSurveyEntity.getEmailId());
                System.out.println("userEntity:"+userEntity);
            }
            else if(type.equals("C")){
                ClosedSurveyEntity closedSurveyEntity = closedSurveyRepository.findOneByUuid(uuid);
                userEntity = userRepository.findOneByEmail(closedSurveyEntity.getEmailId());
            }
            if(userEntity.getId() != null) {
                userId = userEntity.getId();
                emailId = userEntity.getEmail_id();
                savedResponse.setUserId(String.valueOf(userId));
            }


            List<QuestionEntity> questions = questionRepository.findAllBySurveyId(s);
            for(QuestionEntity q: questions){
                Set<AnswerEntity> answers = q.getAnswers();
                System.out.println("SIZE"+answers.size());
                for(AnswerEntity ans: answers){
                    System.out.println("ASDADQWDASDAWD"+ans.getEmailId().toLowerCase());
                    System.out.println("ASDADQWDASDAWD"+emailId.toLowerCase());
                    if(!ans.getEmailId().toLowerCase().equals(emailId.toLowerCase()) || emailId.equals("")){
                        System.out.println("@$@##$#");
                        answers.remove(ans);
                    }
                }
            }
            savedResponse.setQuestions(questions);

           if(!s.isIs_published()){
               BadRequest badRequest = BadRequest.createBadRequest(400, "Sorry, the survey you are looking for has already expired");
               return new ResponseEntity<BadRequest>(badRequest, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity(savedResponse, HttpStatus.OK);

        }
        else{
            BadRequest badRequest = BadRequest.createBadRequest(400, "Sorry, the survey you are looking for has already expired");
            return new ResponseEntity<BadRequest>(badRequest, HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @PostMapping(value = "/addsurveyees",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addSurvees(@RequestBody Map<String, Object> payload) throws JSONException {

        SurveyEntity surveyEntity;

        JSONObject jsonObject = new JSONObject(payload);
        surveyEntity = surveyRepository.findOne(jsonObject.getInt("survey_id"));
        String[] newinvitees = jsonObject.getString("invitees").split(",");

        Set<ClosedSurveyEntity> old_closed_survey_entries = surveyEntity.getClosed_surveys();

        System.out.println("old_closed_survey_entries:"+old_closed_survey_entries);
        Set<UserEntity> old_users = new HashSet<>();
        for(ClosedSurveyEntity c :old_closed_survey_entries )
        {
            System.out.println("c.getInvitee_user_id():"+c.getInviteeUserId());
            old_users.add(c.getInviteeUserId());
        }



        for(String s:newinvitees)
        {
            ClosedSurveyEntity closedSurveyEntity = new ClosedSurveyEntity();
            closedSurveyEntity.setSurveyId(surveyEntity);

            List<UserEntity> userEntity = userRepository.findByEmail(s);

            closedSurveyEntity.setInviteeUserId(userEntity.get(0));

            // if user already exists skip the addition

            if(old_users.contains(userEntity.get(0)))
            {
                System.out.println("Already in the list");
                continue;
            }

            UUID uuid = UUID.randomUUID();
            closedSurveyEntity.setInvitee_link("http://localhost:8080/" + surveyEntity.getSurveyId() + "/" + String.valueOf(uuid));
            closedSurveyRepository.save(closedSurveyEntity);
        }


        return new ResponseEntity("OK" , HttpStatus.OK);
    }


    // when save/publish for the first time
    @Transactional
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createSurvey(@RequestBody Map<String, Object> payload) throws JSONException {


        SurveyEntity surveyEntity = new SurveyEntity();

        JSONObject jsonObject = new JSONObject(payload);
        System.out.println("jsonObject:"+jsonObject);

        // Logic for updating the survey

        if (jsonObject.getInt("survey_id") != 0)
        {
            if(surveyRepository.findOne(jsonObject.getInt("survey_id")).isIs_published())
            {
                return new ResponseEntity("Already Published" , HttpStatus.BAD_REQUEST);
            }
        }

        if (jsonObject.getInt("survey_id") != 0) {
            surveyEntity = surveyRepository.findOne(jsonObject.getInt("survey_id"));

            // Adding the survey details
            surveyEntity.setSurvey_name(jsonObject.getString("survey_name"));
            surveyEntity.setIs_published(jsonObject.getBoolean("is_published"));
            surveyEntity.setSurvey_type(jsonObject.getString("surveytype"));
            surveyEntity.setUser_id(userRepository.findOne(jsonObject.getInt("user_id")));

            try {
                String endTime = jsonObject.getString("end_time");
                //  DATE FORMAT FROM HTML <input type="datetime-local" : 2018-05-09T14:02
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm");
                Date endDateTime = formatter.parse(endTime);
                surveyEntity.setEndTime(endDateTime);
            } catch (Exception e) {
                System.out.println(e);
            }
            surveyEntity.setStartTime(new Date());

            // removing older question and options
            for (QuestionEntity q : surveyEntity.getQuestions()) {
                System.out.println("q.getOptions():"+q.getOptions());
                q.getOptions().clear();
                questionRepository.save(q);
            }

            surveyEntity.getQuestions().clear();

            // save the survey
            surveyRepository.save(surveyEntity);

            JSONArray question_array = jsonObject.getJSONArray("questions");
            Set<QuestionEntity> question_list = new HashSet<>();

            for (int i = 0; i < question_array.length(); i++) {
                JSONObject question_object = question_array.getJSONObject(i);

                QuestionEntity questionEntity = new QuestionEntity();

                // Adding the question details
                questionEntity.setQuestion_text(question_object.getString("question_text"));
                questionEntity.setQuestion_type(question_object.getString("question_type"));
                questionEntity.setSurveyId(surveyEntity);
                questionRepository.save(questionEntity);

                JSONArray options_array = question_object.getJSONArray("options");
                Set<OptionsEntity> option_list = new HashSet<>();

                if(question_object.getString("question_type").equals("TB") || question_object.getString("question_type").equals("ST") || question_object.getString("question_type").equals("DR") || question_object.getString("question_type").equals("DT"))
                {
                    OptionsEntity optionsEntity = new OptionsEntity();
                    optionsEntity.setOption_description("");
                    optionsEntity.setQuestion_id(questionEntity);
                    optionsRepository.save(optionsEntity);
                }
                else {
                    for (int j = 0; j < options_array.length(); j++) {
                        JSONObject option_object = options_array.getJSONObject(j);
                        System.out.println("option_object" + option_object);
                        OptionsEntity optionsEntity = new OptionsEntity();
                        optionsEntity.setOption_description(option_object.getString("option_description"));
                        optionsEntity.setQuestion_id(questionEntity);
                        optionsRepository.save(optionsEntity);


                    }
                }

                // if Survey is a closed survey then update the Invitess also


            }

            // Survey Type logic handling

            if (jsonObject.getBoolean("is_published")) {
                if (jsonObject.getString("surveytype").equals("G")) {

                    OpenSurveyEntity openSurveyEntity = new OpenSurveyEntity();
                    openSurveyEntity.setSurvey_id(surveyEntity);
                    UUID uuid = UUID.randomUUID();
                    openSurveyEntity.setUuid(String.valueOf(uuid));
                    openSurveyEntity.setInvitation_link("http://localhost:8080/" + surveyEntity.getSurveyId() + "/" + String.valueOf(uuid));
                    openSurveyEntity.setIslinkused(0);
                    openSurveyRepository.save(openSurveyEntity);

                }


                if (jsonObject.getString("surveytype").equals("C") ) {

                    // Generating invitees array

                    String[] invitess = jsonObject.getString("closed_invitees").split(",");
                    //System.out.println(jsonObject.getString("closed_invitees")+":abcdefghijkl");
                    //System.out.println(invitess.length+"abcdefghijkl");
                   if( jsonObject.getString("closed_invitees") != ""){
                        for (String user : invitess) {

                            ClosedSurveyEntity closedSurveyEntity = new ClosedSurveyEntity();
                            closedSurveyEntity.setSurveyId(surveyEntity);

                            UserEntity userEntity = userRepository.findOneByEmail(user);
                            closedSurveyEntity.setInviteeUserId(userEntity);
                            UUID uuid = UUID.randomUUID();
                            closedSurveyEntity.setUudi(String.valueOf(uuid));
                            closedSurveyEntity.setInvitee_link("http://localhost:8080/" + surveyEntity.getSurveyId() + "/" + String.valueOf(uuid));
                            closedSurveyRepository.save(closedSurveyEntity);

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
                                        InternetAddress.parse(user));
                                message.setSubject("Please verify your email address");
                                message.setText("You have been invited to take the survey !" + System.lineSeparator() + "Follow this Link to take the survey : " + System.lineSeparator() + "http://localhost:3000/survey/" + surveyEntity.getSurveyId() + "/" + String.valueOf(uuid));

                                Transport.send(message);

                                System.out.println("Done");

                            } catch (MessagingException e) {
                                throw new RuntimeException(e);
                            }
                        }
                    }

                    List<ClosedSurveyEntity> closed_email = closedSurveyRepository.findAllBySurveyId(surveyEntity);
                    System.out.println("closed_email:"+closed_email.size());

                    for(ClosedSurveyEntity c:closed_email) {
                        if (c.getEmailId() != null) {
                            System.out.println("c.getEmailId()):" + c.getEmailId());
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
                                        InternetAddress.parse(c.getEmailId()));
                                message.setSubject("Please verify your email address");
                                message.setText("You have been invited to take the survey !" + System.lineSeparator() + "Follow this Link to take the survey : " + System.lineSeparator() + "http://localhost:3000/survey/" + surveyEntity.getSurveyId() + "/" + c.getUuid());

                                Transport.send(message);

                                System.out.println("Done");

                            } catch (MessagingException e) {
                                throw new RuntimeException(e);
                            }

                        }
                    }
                }
            }
            else {
                if (jsonObject.getString("surveytype").equals("C")) {
                    String[] invitess = jsonObject.getString("closed_invitees").split(",");

                    for (String user : invitess) {
                        ClosedSurveyEntity closedSurveyEntity = new ClosedSurveyEntity();
                        closedSurveyEntity.setSurveyId(surveyEntity);

                        UserEntity userEntity= userRepository.findOneByEmail(user);
                        closedSurveyEntity.setInviteeUserId(userEntity);
                        UUID uuid = UUID.randomUUID();
                        closedSurveyEntity.setUudi(String.valueOf(uuid));
                        closedSurveyEntity.setInvitee_link("http://localhost:8080/" + surveyEntity.getSurveyId() + "/" + String.valueOf(uuid));
                        closedSurveyEntity.setEmailId(user);
                        closedSurveyRepository.save(closedSurveyEntity);
                    }
                }
            }
        }

        // NEW SURVEY

        else {

            // Adding the survey details
            surveyEntity.setSurvey_name(jsonObject.getString("survey_name"));
            surveyEntity.setIs_published(jsonObject.getBoolean("is_published"));
            surveyEntity.setSurvey_type(jsonObject.getString("surveytype"));
            surveyEntity.setUser_id(userRepository.findOne(jsonObject.getInt("user_id")));

            try {
                String endTime = jsonObject.getString("end_time");
                //  DATE FORMAT FROM HTML <input type="datetime-local" : 2018-05-09T14:02
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm");
                Date endDateTime = formatter.parse(endTime);
                surveyEntity.setEndTime(endDateTime);
            }
            catch (Exception e){
                System.out.println(e);
            }
            surveyEntity.setStartTime(new Date());

            // save the survey
            surveyRepository.save(surveyEntity);

            // Fetched the questions Array for the surveys
            JSONArray question_array = jsonObject.getJSONArray("questions");
            Set<QuestionEntity> question_list = new HashSet<>();


            for (int i = 0; i < question_array.length(); i++) {
                JSONObject question_object = question_array.getJSONObject(i);

                QuestionEntity questionEntity = new QuestionEntity();

                // Adding the question details
                questionEntity.setQuestion_text(question_object.getString("question_text"));
                questionEntity.setQuestion_type(question_object.getString("question_type"));
                questionEntity.setSurveyId(surveyEntity);
                questionRepository.save(questionEntity);

                JSONArray options_array = question_object.getJSONArray("options");
                Set<OptionsEntity> option_list = new HashSet<>();

                // added for Harsh - Question type
                if(question_object.getString("question_type").equals("TB") || question_object.getString("question_type").equals("ST") || question_object.getString("question_type").equals("DR") || question_object.getString("question_type").equals("DT"))
                {
                    OptionsEntity optionsEntity = new OptionsEntity();
                    optionsEntity.setOption_description("");
                    optionsEntity.setQuestion_id(questionEntity);
                    optionsRepository.save(optionsEntity);
                }
                else {

                    for (int j = 0; j < options_array.length(); j++) {
                        JSONObject option_object = options_array.getJSONObject(j);
                        System.out.println("option_object" + option_object);
                        OptionsEntity optionsEntity = new OptionsEntity();
                        optionsEntity.setOption_description(option_object.getString("option_description"));
                        optionsEntity.setQuestion_id(questionEntity);
                        optionsRepository.save(optionsEntity);


                    }
                }

            }

            //Save the Survey
            SurveyEntity se = surveyRepository.save(surveyEntity);
            

            if(jsonObject.getBoolean("is_published"))
            {

                if (jsonObject.getString("surveytype").equals("G")) {

                    OpenSurveyEntity openSurveyEntity = new OpenSurveyEntity();
                    openSurveyEntity.setSurvey_id(surveyEntity);
                    UUID uuid = UUID.randomUUID();
                    openSurveyEntity.setUuid(String.valueOf(uuid));
                    openSurveyEntity.setInvitation_link("http://localhost:8080/" + se.getSurveyId() + "/" + String.valueOf(uuid));
                    openSurveyEntity.setIslinkused(0);
                    openSurveyRepository.save(openSurveyEntity);

                }
                if (jsonObject.getString("surveytype").equals("C")) {
                    // Generating invitees array
                    String[] invitess = jsonObject.getString("closed_invitees").split(",");

                    for (String user : invitess) {
                        ClosedSurveyEntity closedSurveyEntity = new ClosedSurveyEntity();
                        closedSurveyEntity.setSurveyId(surveyEntity);

                        //List<UserEntity> userEntity = userRepository.findByEmail(user);
                        UserEntity userEntity= userRepository.findOneByEmail(user);
                        closedSurveyEntity.setInviteeUserId(userEntity);
                        UUID uuid = UUID.randomUUID();
                        closedSurveyEntity.setUudi(String.valueOf(uuid));
                        closedSurveyEntity.setInvitee_link("http://localhost:8080/" + se.getSurveyId() + "/" + String.valueOf(uuid));
                        closedSurveyEntity.setEmailId(user);
                        closedSurveyRepository.save(closedSurveyEntity);

                        // mail the survey link to the invitees

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
                                    InternetAddress.parse(user));
                            message.setSubject("Please verify your email address");
                            message.setText("You have been invited to take the survey !"+ System.lineSeparator() +"Follow this Link to take the survey : "+System.lineSeparator()+ "http://localhost:3000/survey/"+se.getSurveyId()+"/"+String.valueOf(uuid));

                            Transport.send(message);

                            System.out.println("Done");

                        } catch (MessagingException e) {
                            throw new RuntimeException(e);
                        }

                    }

                }

            }
            else
            {
                if (jsonObject.getString("surveytype").equals("C")) {
                    String[] invitess = jsonObject.getString("closed_invitees").split(",");

                    for (String user : invitess) {
                        ClosedSurveyEntity closedSurveyEntity = new ClosedSurveyEntity();
                        closedSurveyEntity.setSurveyId(surveyEntity);

                        List<UserEntity> userEntity = userRepository.findByEmail(user);
                        closedSurveyEntity.setInviteeUserId(userEntity.get(0));
                        UUID uuid = UUID.randomUUID();
                        closedSurveyEntity.setUudi(String.valueOf(uuid));
                        closedSurveyEntity.setInvitee_link("http://localhost:8080/" + se.getSurveyId() + "/" + String.valueOf(uuid));
                        closedSurveyEntity.setEmailId(user);
                        closedSurveyRepository.save(closedSurveyEntity);
                    }
                }

            }

        }



            return new ResponseEntity("OK" , HttpStatus.OK);
    }

    // Unpublish mate change karvanu 6e
    // currently, survey ni entry delete thai jay 6e
    // but end time update karbvanu 6 - DONE!!!

    // also check if any response received

    @Transactional
    @DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> closeSurvey(@RequestBody Map<String, Object> payload) throws JSONException {

        JSONObject jsonObject = new JSONObject(payload);

         //jsonObject.getInt("survey_id") != 0

            SurveyEntity surveyEntity = surveyRepository.findOne(jsonObject.getInt("survey_id"));


//            // removing older question and options
//            for(QuestionEntity q : surveyEntity.getQuestions())
//            {
//                q.getOptions().clear();
//                questionRepository.save(q);
//            }
//
//            surveyEntity.getQuestions().clear();

//            surveyRepository.delete(surveyEntity);
            Calendar cal = Calendar.getInstance();
            cal.set(Calendar.YEAR, 1969);
            cal.set(Calendar.MONTH, Calendar.DECEMBER);
            cal.set(Calendar.DAY_OF_MONTH, 31);
            surveyEntity.setEndTime(cal.getTime());
            surveyRepository.save(surveyEntity);

        return new ResponseEntity("OK" , HttpStatus.OK);
    }

    @Transactional
    @JsonView({Survey.summary.class})
    @GetMapping(value = "/allsavedsurveys")
    public ResponseEntity<?> allSavedSurveys(@RequestParam("user_id") int user_id) throws JSONException {

        //JSONObject jsonObject = new JSONObject(payload);
        //int user_id = jsonObject.getInt("user_id");
        //System.out.println("user_id:"+user_id);
        UserEntity userEntity = userRepository.findOne(user_id);

        if(userEntity== null)
        {
            return new ResponseEntity("No Such User!!",HttpStatus.OK);
        }

        //System.out.println("userEntity.getSurveys():"+userEntity.getSurveys());

//        for (SurveyEntity s:userEntity.getSurveys())
//        {
//            System.out.println(s.getSurvey_id()+ "::"+s.getSurvey_name());
//        }
        //njndvhubvuhb
        //return new ResponseEntity(userEntity.getSurveys() , HttpStatus.OK);
        //System.out.println(surveyRepository.findByIspublishedAndUserid(true,userEntity));

        //return new ResponseEntity(surveyRepository.findByUseridAndEndTimeGreaterThan(userEntity, new Date()),HttpStatus.OK);
        return new ResponseEntity(surveyRepository.findAllByUserid(userEntity),HttpStatus.OK);
    }

    @Transactional
    @JsonView({Survey.summary.class})
    @GetMapping(value = "/allopenuniquesurveys")
    public ResponseEntity<?> allOpenUniqueSurveys() throws JSONException {

        return new ResponseEntity(surveyRepository.findAllBySurveytype("O"),HttpStatus.OK);
    }

    @Transactional
    @JsonView({Survey.summary.class})
    @GetMapping(value = "/allgeneralsurveys")
    public ResponseEntity<?> allGeneralSurveys() throws JSONException {

        return new ResponseEntity(surveyRepository.findBySurveytype("G"),HttpStatus.OK);}

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE,produces = MediaType.APPLICATION_JSON_VALUE,value = "/uploadImages")
    public ResponseEntity<?> Upload(@RequestParam("mypic") MultipartFile files) throws Exception{
        try {
            System.out.println("in images upload");
//            for (int i = 0; i <files.length ; i++) {
                files.transferTo(new File( "C:\\Repos\\CMPE275\\CMPE275-SurveyApe\\src\\main\\resources" +File.separator + files.getOriginalFilename()));

            //}

        } catch (Exception ex) {
            System.out.println(ex);
        }

        JSONObject jo = new JSONObject();
        jo.put("message", "uploaded successfully");
        return new ResponseEntity("uploaded successfully", HttpStatus.CREATED);

    }

    @Transactional
    @JsonView({Survey.summary.class})
    @PostMapping(value = "/unpublish")
    public ResponseEntity<?> unpublishsurvey(@RequestBody Map<String, Object> payload) throws JSONException {

        JSONObject jsonObject = new JSONObject(payload);
        SurveyEntity surveyEntity = surveyRepository.findOne(jsonObject.getInt("survey_id"));

        surveyEntity.setIs_published(false);
        surveyRepository.save(surveyEntity);
        return new ResponseEntity("ok",HttpStatus.OK);

    }
}


