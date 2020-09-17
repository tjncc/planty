package plantorganizer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class PlantOrganizerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlantOrganizerApplication.class, args);
	}

}
