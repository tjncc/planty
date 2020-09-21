package plantorganizer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import plantorganizer.dto.PlantDTO;
import plantorganizer.dto.UserDTO;
import plantorganizer.dto.UserUpdateDTO;
import plantorganizer.service.interfaces.UserService;

@RestController
@RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
    @Autowired
    UserService userService;

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("update")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdateDTO userUpdateDTO) {

        UserDTO user = userService.update(userUpdateDTO);
        if(user != null){
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Username or password are already in use.", HttpStatus.BAD_REQUEST);
        }
    }
}
