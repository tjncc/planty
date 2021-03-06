package plantorganizer.service;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import plantorganizer.dto.UserDTO;
import plantorganizer.dto.UserUpdateDTO;
import plantorganizer.helpers.Role;
import plantorganizer.helpers.TimeProvider;
import plantorganizer.model.Authority;
import plantorganizer.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import plantorganizer.repository.UserRepository;
import plantorganizer.service.interfaces.AuthorityService;
import plantorganizer.service.interfaces.UserService;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TimeProvider timeProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    AuthorityService authorityService;

    @Autowired
    ModelMapper modelMapper;

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
    public User saveNew(User user) {
        user.setRole(Role.USER);

        Authority authority = authorityService.findByName(Role.USER.toString());
        List<Authority> authorities = new ArrayList<>();
        authorities.add(authority);
        user.setAuthorities(authorities);

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        user.setLastPasswordResetDate(timestamp);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public UserDTO update(UserUpdateDTO userDTO) {
        User user = findByUsername(userDTO.getOldUsername());

        if( (findByUsername(userDTO.getUsername()) != null) && (userDTO.getUsername() != user.getUsername())
        && ( (findByEmail(userDTO.getEmail()) != null) && (userDTO.getEmail() != user.getEmail())) ) {
            return null;
        }

        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        userRepository.save(user);
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
