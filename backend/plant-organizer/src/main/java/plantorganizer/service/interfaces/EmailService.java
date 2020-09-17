package plantorganizer.service.interfaces;

import plantorganizer.model.Plant;
import plantorganizer.model.User;

public interface EmailService {
    void sendNotificaitionAsync(User user, Plant plant) throws InterruptedException;
}
