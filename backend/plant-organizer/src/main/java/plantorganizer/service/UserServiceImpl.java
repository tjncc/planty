package plantorganizer.service;

import plantorganizer.helpers.Role;
import plantorganizer.helpers.TimeProvider;
import plantorganizer.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import plantorganizer.repository.UserRepository;
import plantorganizer.service.interfaces.UserService;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TimeProvider timeProvider;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("User with username '%s' was not found", username));
        } else {
            return user;
        }
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User findById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.get() != null) {
            return user.get();
        } else {
            return null;
        }
    }

    @Override
    public User save(User user) {
        user.setRole(Role.USER);
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        user.setLastPasswordResetDate(timestamp);
        return userRepository.save(user);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
