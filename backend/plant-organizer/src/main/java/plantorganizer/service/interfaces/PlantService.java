package plantorganizer.service.interfaces;

import org.springframework.data.domain.Page;
import plantorganizer.dto.PlantDTO;
import plantorganizer.model.Plant;

import java.util.List;

public interface PlantService {

    PlantDTO findById(long id);
    PlantDTO findByName(String name);
    PlantDTO save(PlantDTO plantDTO);
    List<PlantDTO> findAll();
    Boolean deletePlant(long id);
    PlantDTO updatePlant(long id, PlantDTO plantDTO);
    Page<PlantDTO> findPageable(int page, int size);
}
