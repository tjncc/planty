package plantorganizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import plantorganizer.helpers.RequestStatus;
import plantorganizer.model.PlantRequest;

import java.util.List;

@Repository
public interface PlantRequestRepository extends JpaRepository<PlantRequest, Long> {

    PlantRequest findById(long id);
    PlantRequest save(PlantRequest save);
    List<PlantRequest> findAll();
    List<PlantRequest> findAllByRequestStatus(RequestStatus requestStatus);

}
