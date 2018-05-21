package com.cmpe275.termproject.resource;

import com.cmpe275.termproject.helperClasses.BadRequest;
import com.cmpe275.termproject.model.UserEntity;
import com.cmpe275.termproject.repository.UserRepository;
import org.apache.catalina.User;
import org.json.XML;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import java.util.*;
import javax.mail.Multipart;
/*@CrossOrigin(origins = "*")*/
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/")
public class UserResource {

    private UserRepository userRepository;
    public UserResource(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    @ResponseBody
    @PostMapping(value="/login",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> checkLogin(HttpServletRequest request,
                                        HttpServletResponse response)
    {

        String email = request.getParameter("email");
        String password = request.getParameter("password");
        System.out.println(email);
        System.out.println(password);
        UserEntity userEntity=new UserEntity();
        userEntity=userRepository.findOneByEmail(email);
        if(userEntity.getEmail().equals(email) && userEntity.getPassword().equals(password))
        {
            return new ResponseEntity(userRepository.findOneByEmail(email), HttpStatus.OK);
        }
        return new ResponseEntity(userRepository.findOneByEmail(email), HttpStatus.ALREADY_REPORTED);
        //return new ResponseEntity<>(badRequest,HttpStatus.NOT_IMPLEMENTED);

    }


    @RequestMapping(method=RequestMethod.POST,value="/signup",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> signUp(HttpServletRequest request,
                                    HttpServletResponse response)
    {

        String email = request.getParameter("email");
        String firstName = request.getParameter("firstName");
        String userPassword = request.getParameter("password");
        String verificationCode = ""+((int)(Math.random()*9000)+1000);
        UserEntity loginSignUpModel=new UserEntity();
//		List<LoginSignUpModel> usersList= new ArrayList<>();
//		loginSignUpModel=loginSignUpRepository.findOne(email);
//
//System.out.println(loginSignUpModel.getEmail());
//		if(loginSignUpModel.getEmail()!=null)
//		{
//			return new ResponseEntity<>(new BadRequest(404, "Sorry, the email "+email+ "is already registered"),HttpStatus.NOT_IMPLEMENTED);
//		}

//		System.out.println("email is : " + email);
//		System.out.println("firstName is : " + firstName);
//		System.out.println("userPassword is : " + userPassword);
//		System.out.println("verificationCode is : " + verificationCode);

        List<UserEntity> usersList= new ArrayList<>();
        userRepository.findAll().forEach(usersList::add);
        Boolean isPresent= usersList.stream().filter(o -> o.getEmail().equals(email)).findFirst().isPresent();
        System.out.println(isPresent);
        if(isPresent !=true)
        {
            loginSignUpModel=new UserEntity();
            loginSignUpModel.setEmail(email);
            loginSignUpModel.setFirstName(firstName);
            loginSignUpModel.setPassword(userPassword);
            loginSignUpModel.setVerificationCode(verificationCode);
            userRepository.save(loginSignUpModel);


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
                        InternetAddress.parse(email));
                message.setSubject("Please verify your email address");
                message.setText( "Hi "+firstName+ ","+  System.lineSeparator() +"Thank you for registering with SurveyApe"+ System.lineSeparator() +"Enter the following four digit code to verify your account : "+ verificationCode );


              System.out.println("Done");
//
//                MimeBodyPart messageBodyPart = new MimeBodyPart();
//
//                Multipart multipart = new MimeMultipart();
//
//                messageBodyPart = new MimeBodyPart();
//                String file = "src/main/resources/google.png";
//                String fileName = "attachmentName";
//                DataSource source = new FileDataSource(file);
//                messageBodyPart.setDataHandler(new DataHandler(source));
//                messageBodyPart.setFileName("fileName.jpg");
//                messageBodyPart.setHeader("Content-ID", "<image>");
//                multipart.addBodyPart(messageBodyPart);
//
//                message.setContent(multipart);
                Transport.send(message);


                System.out.println("Sent message successfully....");



            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
        }
        else {
            BadRequest badRequest=new BadRequest();
            badRequest.setMessage("Sorry, the email "+email+ "is already registered");
            badRequest.setErrorCode(404);
            return new ResponseEntity<>(badRequest, HttpStatus.ALREADY_REPORTED);
        }
        return new ResponseEntity(userRepository.findOneByEmail(email), HttpStatus.OK);
        //return new ResponseEntity<>(badRequest,HttpStatus.NOT_IMPLEMENTED);

    }


    @RequestMapping(method=RequestMethod.POST,value="/upload",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody

    public ResponseEntity<?> upload(HttpServletRequest request,HttpServletResponse response,@RequestParam("file") MultipartFile file) throws IOException
    {
        System.out.println("in file upload");
        String fileName = file.getOriginalFilename();
        System.out.println(fileName);
        OutputStream out = null;
        InputStream filecontent = null;
        final PrintWriter writer = response.getWriter();
        try {
            out = new FileOutputStream(new File("src/test/resources" + File.separator
                    + fileName));
            filecontent = file.getInputStream();

            int read = 0;
            final byte[] bytes = new byte[1024];

            while ((read = filecontent.read(bytes)) != -1) {
                out.write(bytes, 0, read);
            }
        }
        catch (Exception e) {
            // TODO: handle exception
        }



        return new ResponseEntity(userRepository.findOneByEmail("sriharsha.vanga@sjsu.edu"), HttpStatus.OK);
    }



    @RequestMapping(method=RequestMethod.POST,value="/verificationCheck",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> verificationCheck(HttpServletRequest request,HttpServletResponse response)
    {

        String email = request.getParameter("email");
        String verificationCode = request.getParameter("verificationCode");
        System.out.println(email);
        System.out.println(verificationCode);
        UserEntity loginSignUpModel=new UserEntity();
        loginSignUpModel=userRepository.findOneByEmail(email);
        if(loginSignUpModel.getVerificationCode().equals(verificationCode))
        {
            loginSignUpModel.setIsVerified("Y");
            userRepository.save(loginSignUpModel);


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
                message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(email));
                message.setSubject("Account is active");
                message.setText( "Hi "+","+  System.lineSeparator() +"Thank you for verifying your account with SurveyApe"+ System.lineSeparator() +"Your account is now active");
                Transport.send(message);
                System.out.println("Verification-Success Email Delievered");

            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
            return new ResponseEntity(userRepository.findOneByEmail(email), HttpStatus.OK);
        }
        return new ResponseEntity(userRepository.findOneByEmail(email), HttpStatus.ALREADY_REPORTED);
        //return new ResponseEntity<>(badRequest,HttpStatus.NOT_IMPLEMENTED);

    }



}