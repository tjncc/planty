package plantorganizer.controller;

import plantorganizer.dto.UserDTO;
import plantorganizer.model.PersonTokenState;
import plantorganizer.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import plantorganizer.security.TokenUtils;
import plantorganizer.security.auth.JwtAuthenticationRequest;
import plantorganizer.service.interfaces.UserService;

import javax.websocket.server.PathParam;
import java.security.Principal;

@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    TokenUtils tokenUtils;


    @PostMapping(value = "/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest){

        if(userService.findByUsername(authenticationRequest.getUsername()) == null){
            return new ResponseEntity<>("User with this username does not exist!", HttpStatus.NOT_FOUND);
        }

        final Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User)userService.loadUserByUsername(authenticationRequest.getUsername());

        if(!user.isEnabled()){
            return new ResponseEntity<>("Profile is not enabled!", HttpStatus.BAD_REQUEST);
        }

        String jwt = tokenUtils.generateToken(user.getUsername());
        int expiresIn = tokenUtils.getExpiredIn();

        return ResponseEntity.ok(new PersonTokenState(jwt, expiresIn, user.getUsername()));

    }

    @PostMapping(consumes = "application/json", path = "/register")
    public ResponseEntity<?> createRegisterAgent(@RequestBody User user) {

        if(userService.findByUsername(user.getUsername()) != null ||
                userService.findByEmail(user.getEmail()) != null){
            return new ResponseEntity<>("Username or email is already taken!", HttpStatus.BAD_REQUEST);
        }

        userService.saveNew(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("role")
    public ResponseEntity<?> getUser(Principal p){
        User user = userService.findByUsername(p.getName());

        if(user != null){
            UserDTO userDTO = new UserDTO(user);
            return ResponseEntity.ok(userDTO);
        }else {
            return  ResponseEntity.status(500).build();
        }

    }

}
