package plantorganizer.service.interfaces;

import org.springframework.data.domain.Page;
import plantorganizer.dto.NewPlantDTO;
import plantorganizer.dto.PlantDTO;
import plantorganizer.model.Plant;

import java.security.Principal;
import java.util.List;

public interface PlantService {

    PlantDTO findById(long id);
    PlantDTO findByName(String name);
    PlantDTO save(PlantDTO plantDTO);
    List<PlantDTO> findAll();
    Boolean deletePlant(long id);
    PlantDTO updatePlant(long id, PlantDTO plantDTO);
    Page<PlantDTO> findPageable(int page, int size);
    Plant saveModel(NewPlantDTO plantDTO);
    Page<PlantDTO> findAllLikedByUser(int page, int size, Principal principal);
    Page<PlantDTO> implementPagination(List<Plant> plants, int page, int size);
    Page<PlantDTO> findAllMyPlants(int page, int size, Principal principal);
}
