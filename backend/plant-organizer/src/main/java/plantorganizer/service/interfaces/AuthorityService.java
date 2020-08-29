package plantorganizer.service.interfaces;

import plantorganizer.model.Authority;

public interface AuthorityService {
    Authority findByName(String name);
}
