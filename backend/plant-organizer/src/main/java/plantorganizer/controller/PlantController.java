package plantorganizer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.RouteMatcher;
import org.springframework.web.bind.annotation.*;
import plantorganizer.dto.PlantDTO;
import plantorganizer.helpers.WateringTime;
import plantorganizer.model.Plant;
import plantorganizer.security.auth.JwtAuthenticationRequest;
import plantorganizer.service.interfaces.PlantService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "/plant", produces = MediaType.APPLICATION_JSON_VALUE)
public class PlantController {

    @Autowired
    PlantService plantService;

    //@PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<?> addPlant(@RequestBody PlantDTO plantDTO) {

        PlantDTO plant = plantService.save(plantDTO);
        if(plant != null){
            return new ResponseEntity<>(plant, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Plant cannot be created", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getPlantById(@PathVariable String id){
        PlantDTO plant = plantService.findById(Long.parseLong(id));
        if(plant != null){
            return new ResponseEntity<>(plant, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Plant cannot be found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(params = {"page","size","search"})
    public ResponseEntity<?> getAllPlants(@RequestParam int page, @RequestParam int size, @RequestParam String search){
        Page<PlantDTO> plants = plantService.findPageable(page,size,search);
        if(plants != null){
            return new ResponseEntity<>(plants, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Plants cannot load", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deletePlant(@PathVariable String id){
        if(plantService.deletePlant(Long.parseLong(id))){
            return new ResponseEntity<>("Deleted",HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updatePlant(@PathVariable String id, @RequestBody PlantDTO plantDTO){
        PlantDTO plant = plantService.updatePlant(Long.parseLong(id),plantDTO);
        if(plant != null){
            return new ResponseEntity<>(plant,HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = {"liked"}, params = {"page","size","search"})
    public ResponseEntity<?> getAllLikedPlants(@RequestParam int page, @RequestParam int size, @RequestParam String search, Principal principal){
        Page<PlantDTO> plants = plantService.findAllLikedByUser(page, size, search, principal);
        if(plants != null){
            return new ResponseEntity<>(plants, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Plants cannot load", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = {"my"}, params = {"page","size","search"})
    public ResponseEntity<?> getAllMyPlants(@RequestParam int page, @RequestParam int size, @RequestParam String search, Principal principal){
        Page<PlantDTO> plants = plantService.findAllMyPlants(page, size, search, principal);
        if(plants != null){
            return new ResponseEntity<>(plants, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Plants cannot load", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"like/{id}"})
    public ResponseEntity<?> addPlantToCollection(@PathVariable String id, Principal principal){
        int likes = plantService.addToCollection(principal, Long.parseLong(id));
        if(likes != -1){
            return new ResponseEntity<>(likes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Plant is not added to collection.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"dislike/{id}"})
    public ResponseEntity<?> removePlantToCollection(@PathVariable String id, Principal principal){
        int likes = plantService.removeFromCollection(principal, Long.parseLong(id));
        if(likes != -1){
            return new ResponseEntity<>(likes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Plant is not removed from collection.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"check/{id}"})
    public ResponseEntity<?> checkPlant(@PathVariable String id, Principal principal){
        boolean isLiked = plantService.isLiked(principal, Long.parseLong(id));
        return new ResponseEntity<>(isLiked, HttpStatus.OK);
    }
}
