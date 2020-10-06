package plantorganizer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import plantorganizer.helpers.WateringTime;
import plantorganizer.model.Plant;
import plantorganizer.model.User;
import plantorganizer.service.interfaces.EmailService;
import plantorganizer.service.interfaces.UserService;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private Environment env;

    @Override
    @Async
    public void sendNotificaitionAsync(User user, Plant plant) throws InterruptedException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(user.getEmail());
        mail.setFrom(env.getProperty("spring.mail.username"));
        mail.setSubject("Plant organizer: Notification");
        if(plant.getWateringTime().equals(WateringTime.RARELY)){
            mail.setText("Hello " + user.getUsername() + ",\n\nDon't forget about your " + plant.getName() + " even though you don't need to water it frequently." +
                    " Maybe now is the right time to take care of your plant." + "\n\nYour Plant Organizer\n");
        } else {
            mail.setText("Hello " + user.getUsername() + ",\n\nIt is time to water " + plant.getName() + "." + "\n\nYour Plant Organizer\n");
        }

        javaMailSender.send(mail);
    }
}
