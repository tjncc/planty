package plantorganizer.service.interfaces;

import plantorganizer.dto.PlantDTO;
import plantorganizer.dto.PlantRequestDTO;
import plantorganizer.model.PlantRequest;

import java.security.Principal;
import java.util.List;

public interface PlantRequestService {

    PlantRequestDTO save(PlantDTO plantDTO, Principal p);
    List<PlantRequestDTO> findAll();
    PlantRequestDTO findById(long id);
    boolean approveRequest(long id);
    boolean declineRequest(long id);
    List<String> getWateringTime();
}
