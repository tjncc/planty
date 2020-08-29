package plantorganizer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import plantorganizer.model.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, String> {

    Authority findByName(String name);
}
