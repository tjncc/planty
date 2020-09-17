package plantorganizer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import plantorganizer.helpers.WateringTime;
import plantorganizer.model.Plant;
import plantorganizer.model.User;
import plantorganizer.service.interfaces.EmailService;
import plantorganizer.service.interfaces.NotificationService;
import plantorganizer.service.interfaces.PlantService;
import plantorganizer.service.interfaces.UserService;

import javax.persistence.Access;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private PlantService plantService;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Scheduled(cron = "0 0 9 * * *")
    @Override
    public void sendDailyNotification() throws InterruptedException {
        List<Plant> plants = plantService.findAllByWateringTime(WateringTime.DAILY);
        for (Plant plant: plants) {
            for(User user : plant.getUsers()){
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
}
