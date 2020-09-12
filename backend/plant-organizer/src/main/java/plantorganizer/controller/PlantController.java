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

    @GetMapping(params = {"page","size"})
    public ResponseEntity<?> getAllPlants(@RequestParam int page, @RequestParam int size){
        Page<PlantDTO> plants = plantService.findPageable(page,size);
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

    @GetMapping(value = {"liked"}, params = {"page","size"})
    public ResponseEntity<?> getAllLikedPlants(@RequestParam int page, @RequestParam int size, Principal principal){
        Page<PlantDTO> plants = plantService.findAllLikedByUser(page, size, principal);
        if(plants != null){
            return new ResponseEntity<>(plants, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Plants cannot load", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = {"my"}, params = {"page","size"})
    public ResponseEntity<?> getAllMyPlants(@RequestParam int page, @RequestParam int size, Principal principal){
        Page<PlantDTO> plants = plantService.findAllMyPlants(page, size, principal);
        if(plants != null){
            return new ResponseEntity<>(plants, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Plants cannot load", HttpStatus.BAD_REQUEST);
        }
    }
}
