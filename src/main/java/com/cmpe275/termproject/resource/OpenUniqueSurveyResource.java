package com.cmpe275.termproject.resource;

import com.cmpe275.termproject.model.ClosedSurveyEntity;
import com.cmpe275.termproject.model.OpenUniqueSurveyEntity;
import com.cmpe275.termproject.model.SurveyEntity;
import com.cmpe275.termproject.model.UserEntity;
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
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import java.util.HashMap;
import java.io.File;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import  java.util.Date;

import java.io.IOException;
import java.util.Date;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
@RestController
@CrossOrigin(origins = "*")
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

        //
        SurveyEntity checking = surveyRepository.findOne(current_survey.getInt("surveyId"));
        if(checking.getSurvey_type().equals("O"))
        {

            // Logic added for open survey coming from dashboard
        if(jsonObject.getBoolean("dashboard"))
        {   System.out.println("WERQQE@$#$"+jsonObject.getString("userid"));
            SurveyEntity surveyEntity = surveyRepository.findOne(current_survey.getInt("surveyId"));
            OpenUniqueSurveyEntity openUniqueSurveyEntity = new OpenUniqueSurveyEntity();
            openUniqueSurveyEntity.setSurveyId(surveyEntity);
            openUniqueSurveyEntity.setUuid(String.valueOf(uuid));

            UserEntity userEntity = userRepository.findOneByEmail(jsonObject.getString("userid"));

            if(openUniqueSurveyRepository.findOneByEmailIdAndSurveyId(userEntity.getEmail_id(),surveyEntity) != null )
                {
                    OpenUniqueSurveyEntity op = openUniqueSurveyRepository.findOneByEmailIdAndSurveyId(userEntity.getEmail_id(),surveyEntity);
                    return new ResponseEntity("http://janhudesai-ape.herokuapp.com/survey/"+current_survey.getInt("surveyId")+"/"+op.getUuid(), HttpStatus.OK);
            }
            openUniqueSurveyEntity.setEmailId(userEntity.getEmail_id());
            openUniqueSurveyEntity.setInvitation_link("http://janhudesai-ape.herokuapp.com/" + surveyEntity.getSurveyId() + "/" + String.valueOf(uuid));
            openUniqueSurveyEntity.setIslinkused(0);
            openUniqueSurveyRepository.save(openUniqueSurveyEntity);

            JSONObject responsejsonObject = new JSONObject(payload);
            //responsejsonObject.put("url","http://janhudesai-ape.herokuapp.com/survey/"+current_survey.getInt("surveyId")+"/"+String.valueOf(uuid));
            return new ResponseEntity("http://janhudesai-ape.herokuapp.com/survey/"+current_survey.getInt("surveyId")+"/"+String.valueOf(uuid), HttpStatus.OK);
        }

        else {

            SurveyEntity surveyEntity = surveyRepository.findOne(current_survey.getInt("surveyId"));
            OpenUniqueSurveyEntity openUniqueSurveyEntity = new OpenUniqueSurveyEntity();

            openUniqueSurveyEntity.setSurveyId(surveyEntity);
            openUniqueSurveyEntity.setUuid(String.valueOf(uuid));
            openUniqueSurveyEntity.setEmailId(jsonObject.getString("usreid"));
            openUniqueSurveyEntity.setInvitation_link("http://janhudesai-ape.herokuapp.com/" + surveyEntity.getSurveyId() + "/" + String.valueOf(uuid));
            openUniqueSurveyEntity.setIslinkused(0);

            if (openUniqueSurveyRepository.findOneByEmailIdAndSurveyId(jsonObject.getString("usreid"), surveyEntity) != null) {
                OpenUniqueSurveyEntity op = openUniqueSurveyRepository.findOneByEmailIdAndSurveyId(jsonObject.getString("usreid"), surveyEntity);
                return new ResponseEntity("http://janhudesai-ape.herokuapp.com/survey/" + current_survey.getInt("surveyId") + "/" + op.getUuid(), HttpStatus.OK);
            }

            openUniqueSurveyRepository.save(openUniqueSurveyEntity);

            // Send Email


            try {
                String qrCodeData = "http://janhudesai-ape.herokuapp.com/survey/" + current_survey.getInt("surveyId") + "/" + String.valueOf(uuid);
                //String filePath = "C:\\Users\\sriha\\Desktop\\SurveyApp\\google.png";
//                String filePath = "src/main/resources/InvitationCode.png";
                String filePath = System.getProperty("user.dir")+File.separator + "InvitationCode.png";
                String charset = "UTF-8"; // or "ISO-8859-1"
                Map<EncodeHintType, ErrorCorrectionLevel> hintMap = new HashMap<EncodeHintType, ErrorCorrectionLevel>();
                hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
                BitMatrix matrix = new MultiFormatWriter().encode(
                        new String(qrCodeData.getBytes(charset), charset),
                        BarcodeFormat.QR_CODE, 200, 200, hintMap);
                MatrixToImageWriter.writeToFile(matrix, filePath.substring(filePath
                        .lastIndexOf('.') + 1), new File(filePath));
                System.out.println("QR Code image created successfully!");
            } catch (Exception e) {
                System.err.println(e);
            }


            try {
                String host = "smtp.gmail.com";
                String port = "587";
                String mailFrom = "infosurveyape275@gmail.com";
                String password = "qwerty123asdf";

                // message info
                String mailTo = (jsonObject.getString("usreid"));
                String subject = "You are invited to the survey";
                String message="Hi "+jsonObject.getString("usreid")+ ","+  System.lineSeparator() +"Thank you for registering for the survey!"+ System.lineSeparator() +"Follow this Link to take the survey : "+System.lineSeparator()+ "http://janhudesai-ape.herokuapp.com/survey/"+current_survey.getInt("surveyId")+"/"+String.valueOf(uuid);

                // attachments
                String[] attachFiles = new String[1];
//                attachFiles[0] = "src/main/resources/InvitationCode.png";
                attachFiles[0] = System.getProperty("user.dir")+File.separator + "InvitationCode.png";

                sendEmailWithAttachments(host, port, mailFrom, password, mailTo,
                        subject, message, attachFiles);
                System.out.println("Email sent.");
            } catch (Exception ex) {
                System.out.println("Could not send email.");
                ex.printStackTrace();
            }


//        Session session = Session.getInstance(props,
//                new javax.mail.Authenticator() {
//                    protected PasswordAuthentication getPasswordAuthentication() {
//                        return new PasswordAuthentication(username, password);
//                    }
//                });
//
//        try {
//
//            Message message = new MimeMessage(session);
//            message.setFrom(new InternetAddress("infosurveyape275@gmail.com"));
//            message.setRecipients(Message.RecipientType.TO,
//                    InternetAddress.parse(jsonObject.getString("usreid")));
//            message.setSubject("Access your survey here");
//            String MessageContentCustom="Hi "+jsonObject.getString("usreid")+ ","+  System.lineSeparator() +"Thank you for registering for the survey!"+ System.lineSeparator() +"Follow this Link to take the survey : "+System.lineSeparator()+ "http://janhudesai-ape.herokuapp.com/survey/"+current_survey.getInt("surveyId")+"/"+String.valueOf(uuid);
//            message.setText(MessageContentCustom );

//            MimeBodyPart messageBodyPart = new MimeBodyPart();
//
//                Multipart multipart = new MimeMultipart();
//
//                messageBodyPart = new MimeBodyPart();
//                messageBodyPart.setContent(MessageContentCustom, "text/html");
//                String file = "src/main/resources/InvitationCode.png";
//                String fileName = "attachmentName";
//                DataSource source = new FileDataSource(file);
//                messageBodyPart.setDataHandler(new DataHandler(source));
//                messageBodyPart.setFileName("fileName.jpg");
//                messageBodyPart.setHeader("Content-ID", "<image>");
//                multipart.addBodyPart(messageBodyPart);
//
//                message.setContent(multipart);
//           // message.setText( "Hi "+jsonObject.getString("usreid")+ ","+  System.lineSeparator() +"Thank you for registering for the survey!"+ System.lineSeparator() +"Follow this Link to take the survey : "+System.lineSeparator()+ "http://janhudesai-ape.herokuapp.com/survey/"+current_survey.getInt("surveyId")+"/"+String.valueOf(uuid));
//
//            Transport.send(message);

            System.out.println("Done");
        }

    }
    else if(checking.getSurvey_type().equals("C"))
        {
            ClosedSurveyEntity op = closedSurveyRepository.findOneByEmailIdAndSurveyId(jsonObject.getString("usreid"),checking);
            return new ResponseEntity("http://janhudesai-ape.herokuapp.com/survey/" + current_survey.getInt("surveyId") + "/" + op.getUuid(), HttpStatus.OK);
        }

        return new ResponseEntity("OK", HttpStatus.OK);
    }


    public static void sendEmailWithAttachments(String host, String port,
                                                final String userName, final String password, String toAddress,
                                                String subject, String message, String[] attachFiles)
            throws AddressException, MessagingException {
        // sets SMTP server properties
        Properties properties = new Properties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.user", userName);
        properties.put("mail.password", password);

        // creates a new session with an authenticator
        Authenticator auth = new Authenticator() {
            public PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(userName, password);
            }
        };
        Session session = Session.getInstance(properties, auth);

        // creates a new e-mail message
        Message msg = new MimeMessage(session);

        msg.setFrom(new InternetAddress(userName));
        InternetAddress[] toAddresses = { new InternetAddress(toAddress) };
        msg.setRecipients(Message.RecipientType.TO, toAddresses);
        msg.setSubject(subject);
        msg.setSentDate(new Date());

        // creates message part
        MimeBodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setContent(message, "text/html");

        // creates multi-part
        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(messageBodyPart);

        // adds attachments
        if (attachFiles != null && attachFiles.length > 0) {
            for (String filePath : attachFiles) {
                MimeBodyPart attachPart = new MimeBodyPart();

                try {
                    attachPart.attachFile(filePath);
                } catch (IOException ex) {
                    ex.printStackTrace();
                }

                multipart.addBodyPart(attachPart);
            }
        }

        // sets the multi-part as e-mail's content
        msg.setContent(multipart);

        // sends the e-mail
        Transport.send(msg);

    }


}
