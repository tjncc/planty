package plantorganizer.service.interfaces;

import org.springframework.data.domain.Page;
import plantorganizer.dto.NewPlantDTO;
import plantorganizer.dto.PlantDTO;
import plantorganizer.helpers.WateringTime;
import plantorganizer.model.Plant;
import plantorganizer.model.User;

import java.security.Principal;
import java.util.List;

public interface PlantService {

    PlantDTO findById(long id);
    List<Plant> findAllByWateringTime(WateringTime wateringTime);
    PlantDTO save(PlantDTO plantDTO);
    List<PlantDTO> findAll();
    Boolean deletePlant(long id);
    PlantDTO updatePlant(long id, PlantDTO plantDTO);
    Page<PlantDTO> findPageable(int page, int size, String searc);
    Plant saveModel(NewPlantDTO plantDTO);
    Page<PlantDTO> findAllLikedByUser(int page, int size, String search, Principal principal);
    Page<PlantDTO> implementPagination(List<Plant> plants, int page, int size);
    Page<PlantDTO> findAllMyPlants(int page, int size, String search, Principal principal);
    int addToCollection(Principal principal, long id);
    int removeFromCollection(Principal principal, long id);
    boolean isLiked(Principal principal, long id);
}
