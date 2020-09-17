package plantorganizer.service.interfaces;

public interface NotificationService {

    void sendDailyNotification() throws InterruptedException;
    void sendWeeklyNotification() throws InterruptedException;
    void sendMonthlyNotification() throws InterruptedException;
    void sendRarelyNotification() throws InterruptedException;

}
