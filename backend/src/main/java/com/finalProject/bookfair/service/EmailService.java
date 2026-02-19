package com.finalProject.bookfair.service;

import com.finalProject.bookfair.model.EmailLog;
import com.finalProject.bookfair.repository.EmailLogRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailLogRepository emailLogRepository;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Async
    public void sendQr(String to, String name, byte[] qr , LocalDate start, LocalDate end) {

        EmailLog log = new EmailLog();
        log.setToEmail(to);
        log.setSubject("BookFair Entry Pass");
        log.setSentAt(LocalDateTime.now());

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("BookFair Entry Pass");
            helper.setFrom("noreply@bookfair.lk");

            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("startDate", start);
            context.setVariable("endDate", end);


            String html =
                    templateEngine.process("reservation-email", context);

            helper.setText(html, true);
            helper.addAttachment("QR.png",
                    new ByteArrayResource(qr),
                    "image/png");

            mailSender.send(message);
            log.setSuccess(true);

        } catch (Exception e) {
            log.setSuccess(false);
        }

        emailLogRepository.save(log);
    }
}
