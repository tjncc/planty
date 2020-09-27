package plantorganizer.config;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import plantorganizer.helpers.WateringTime;
import plantorganizer.model.Plant;
import plantorganizer.model.User;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;

public class NotificationTask implements Runnable {

    private SimpMessagingTemplate simpMessagingTemplate;
    private User user;


    public NotificationTask(SimpMessagingTemplate simpMessagingTemplate, User user) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.user = user;
    }

    @Override
    public void run() {

        simpMessagingTemplate.convertAndSend("/socket-publisher/", "Hello!");

        for (Plant plant : user.getPlantCollection()) {

            LocalTime time = LocalTime.of(10, 00);
            LocalDateTime date = LocalDateTime.now();
            if (plant.getWateringTime().equals(WateringTime.DAILY)
                    && (LocalTime.now().compareTo(time) < 120)) {

                simpMessagingTemplate.convertAndSendToUser(user.getUsername(), "/socket-publisher/", "It is time to water your " + plant.getName() + "!");

            } else if (plant.getWateringTime().equals(WateringTime.WEEKLY)
                    && date.getDayOfWeek().equals(DayOfWeek.SUNDAY)) {

                simpMessagingTemplate.convertAndSendToUser(user.getUsername(), "/socket-publisher/", "It is time to water your " + plant.getName() + "!");

            } else if (plant.getWateringTime().equals(WateringTime.MONTHLY)
                    && date.getDayOfMonth() == 1) {

                simpMessagingTemplate.convertAndSendToUser(user.getUsername(), "/socket-publisher/", "It is time to water your " + plant.getName() + "!");

            } else if (plant.getWateringTime().equals(WateringTime.RARELY)
                    && (date.getDayOfMonth() == 1)
                    && (date.getMonth().equals(Month.JANUARY) || date.getMonth().equals(Month.JUNE))) {

                simpMessagingTemplate.convertAndSendToUser(user.getUsername(), "/socket-publisher/", "It is time to water your " + plant.getName() + "!");
            }
        }
    }
}
