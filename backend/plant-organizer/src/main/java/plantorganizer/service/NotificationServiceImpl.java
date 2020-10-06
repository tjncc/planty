package plantorganizer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import plantorganizer.config.websocket.SocketTextHandler;
import plantorganizer.helpers.WateringTime;
import plantorganizer.model.Plant;
import plantorganizer.model.User;
import plantorganizer.service.interfaces.EmailService;
import plantorganizer.service.interfaces.NotificationService;
import plantorganizer.service.interfaces.PlantService;
import plantorganizer.service.interfaces.UserService;

import javax.persistence.Access;
import java.io.IOException;
import java.sql.Time;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private PlantService plantService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    @Autowired
    private SocketTextHandler socketTextHandler;


    @Scheduled(cron = "0 00 09 * * *")
    @Override
    public void sendDailyNotification() throws InterruptedException, IOException {
        List<Plant> plants = plantService.findAllByWateringTime(WateringTime.DAILY);
        for (Plant plant: plants) {
            for(User user : plant.getUsers()){
                checkNotifications(user);
                emailService.sendNotificaitionAsync(user,plant);
            }
        }
    }

    @Scheduled(cron = "0 0 9 * * 0")
    @Override
    public void sendWeeklyNotification() throws InterruptedException {
        List<Plant> plants = plantService.findAllByWateringTime(WateringTime.WEEKLY);
        for (Plant plant: plants) {
            for(User user : plant.getUsers()){
                emailService.sendNotificaitionAsync(user,plant);
            }
        }
    }

    @Scheduled(cron = "0 0 9 1 * *")
    @Override
    public void sendMonthlyNotification() throws InterruptedException {
        List<Plant> plants = plantService.findAllByWateringTime(WateringTime.MONTHLY);
        for (Plant plant: plants) {
            for(User user : plant.getUsers()){
                emailService.sendNotificaitionAsync(user,plant);
            }
        }
    }

    @Scheduled(cron = "0 0 9 15 1 *")
    @Scheduled(cron = "0 0 9 15 6 *")
    @Override
    public void sendRarelyNotification() throws InterruptedException {
        List<Plant> plants = plantService.findAllByWateringTime(WateringTime.RARELY);
        for (Plant plant: plants) {
            for(User user : plant.getUsers()){
                emailService.sendNotificaitionAsync(user,plant);
            }
        }
    }

    @Override
    public void checkNotifications(User user) throws IOException {
        for (Plant plant : user.getPlantCollection()) {

            LocalTime time = LocalTime.of(18, 00);
            LocalDateTime date = LocalDateTime.now();
            if ((plant.getWateringTime().equals(WateringTime.DAILY) && (LocalTime.now().compareTo(time) < 120)) ||
                    (plant.getWateringTime().equals(WateringTime.WEEKLY) && date.getDayOfWeek().equals(DayOfWeek.SUNDAY)) ||
                    (plant.getWateringTime().equals(WateringTime.MONTHLY) && date.getDayOfMonth() == 1) ||
                    (plant.getWateringTime().equals(WateringTime.RARELY) && (date.getDayOfMonth() == 1) && (date.getMonth().equals(Month.JANUARY) || date.getMonth().equals(Month.JUNE)))) {
                        socketTextHandler.send("It is time to water " + plant.getName() + "!");
            }
        }
    }

}
