package plantorganizer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import plantorganizer.dto.PlantDTO;
import plantorganizer.dto.PlantRequestDTO;
import plantorganizer.service.interfaces.PlantRequestService;
import plantorganizer.service.interfaces.PlantService;

import java.util.List;

@RestController
@RequestMapping(value = "/plantrequest", produces = MediaType.APPLICATION_JSON_VALUE)
public class PlantRequestController {

    @Autowired
    PlantRequestService plantRequestService;

    public static class ReqIdDTO {
        public String reqId;
    }

    @PostMapping
    public ResponseEntity<?> addPlantRequest(@RequestBody PlantDTO plantDTO) {

        PlantRequestDTO plant = plantRequestService.save(plantDTO);
        if(plant != null){
            return new ResponseEntity<>(plant, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Request cannot be created.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getPlantById(@PathVariable String id){
        PlantRequestDTO request = plantRequestService.findById(Long.parseLong(id));
        if(request != null){
            return new ResponseEntity<>(request, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Request cannot be found.", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllRequests(){
        List<PlantRequestDTO> requests = plantRequestService.findAll();
        if(requests != null){
            return new ResponseEntity<>(requests, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Requests cannot load.", HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/accept")
    public ResponseEntity<?> acceptRequest(@RequestBody ReqIdDTO req){
        boolean isAccepted = plantRequestService.approveRequest(Long.parseLong(req.reqId));
        if(isAccepted){
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Request cannot be accepted.",HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/decline")
    public ResponseEntity<?> declineRequest(@RequestBody ReqIdDTO req){
        boolean isDeclined = plantRequestService.declineRequest(Long.parseLong(req.reqId));
        if(isDeclined){
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Request cannot be declined.",HttpStatus.BAD_REQUEST);
        }
    }


}
