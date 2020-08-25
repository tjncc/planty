package plantorganizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import plantorganizer.model.Plant;

import java.util.List;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {

    Plant findById(long id);
    Plant findByName(String name);
    Plant save(Plant plant);
    List<Plant> findAll();
    void deleteById(long id);
}
