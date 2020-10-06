package plantorganizer.service.interfaces;

import org.springframework.web.socket.WebSocketSession;
import plantorganizer.model.User;

import java.io.IOException;

public interface NotificationService {

    void sendDailyNotification() throws InterruptedException, IOException;
    void sendWeeklyNotification() throws InterruptedException;
    void sendMonthlyNotification() throws InterruptedException;
    void sendRarelyNotification() throws InterruptedException;
    void checkNotifications(User user) throws IOException;
}
