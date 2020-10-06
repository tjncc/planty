package plantorganizer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import plantorganizer.config.websocket.SocketTextHandler;
import plantorganizer.dto.PlantDTO;
import plantorganizer.dto.UserDTO;
import plantorganizer.dto.UserUpdateDTO;
import plantorganizer.model.User;
import plantorganizer.service.interfaces.NotificationService;
import plantorganizer.service.interfaces.UserService;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    NotificationService notificationService;

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


    @GetMapping("/username")
    public ResponseEntity<?> test(Principal principal) throws IOException {
        User user = userService.findByUsername(principal.getName());
        notificationService.checkNotifications(user);
        //socketTextHandler.send("blabla");
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
