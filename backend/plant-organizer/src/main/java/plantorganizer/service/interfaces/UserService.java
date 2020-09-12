package plantorganizer.service.interfaces;

import plantorganizer.dto.UserDTO;
import plantorganizer.dto.UserUpdateDTO;
import plantorganizer.model.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {

    User findByUsername(String username);
    UserDetails loadUserByUsername(String username);
    User findByEmail(String email);
    User findById(Long id);
    User save(User user);
    UserDTO update(UserUpdateDTO userDTO);
}
