package plantorganizer.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import plantorganizer.dto.NewPlantDTO;
import plantorganizer.dto.PlantDTO;
import plantorganizer.helpers.WateringTime;
import plantorganizer.model.Plant;
import plantorganizer.model.User;
import plantorganizer.repository.PlantRepository;
import plantorganizer.service.interfaces.PlantService;
import plantorganizer.service.interfaces.UserService;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
public class PlantServiceImpl implements PlantService {

    @Autowired
    PlantRepository plantRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    UserService userService;

    @Override
    public PlantDTO findById(long id) {

        Plant plant = plantRepository.findById(id);
        if(plant == null){
            return null;
        }

        PlantDTO plantDto = modelMapper.map(plant, PlantDTO.class);
        if(plant.getCreator() != null){
            plantDto.setCreator(plant.getCreator().getUsername());
        }
        plantDto.setLikes(plant.getUsers().size());
        return plantDto;
    }

    @Override
    public List<Plant> findAllByWateringTime(WateringTime wateringTime) {
        List<Plant> plants = plantRepository.findAllByWateringTime(wateringTime);
        return plants;
    }

    @Override
    public PlantDTO save(PlantDTO plantDTO) {

        Plant plant = modelMapper.map(plantDTO, Plant.class);
        User creator = userService.findByUsername(plantDTO.getCreator());
        if(creator != null){
            plant.setCreator(creator);
        }
        plantRepository.save(plant);
        return plantDTO;
    }

    public Plant saveModel(NewPlantDTO plantDto){
        Plant plant = modelMapper.map(plantDto, Plant.class);
        User creator = userService.findByUsername(plantDto.getCreator());
        if(creator != null){
            plant.setCreator(creator);
        }
        return plantRepository.save(plant);
    }

    @Override
    public Page<PlantDTO> findAllLikedByUser(int page, int size, String search, Principal principal) {
        List<Plant> plants = plantRepository.findAll();
        List<Plant> liked = new ArrayList<>();

        for (Plant p: plants) {
            for(User user : p.getUsers()){
                if(user.getUsername().equals(principal.getName())){
                    if(search != ""){
                        if(p.getName().toLowerCase().contains(search.toLowerCase()) || p.getFamily().toLowerCase().contains(search.toLowerCase())){
                            liked.add(p);
                        }
                    } else {
                        liked.add(p);
                    }
                }
            }
        }
        return implementPagination(liked, page, size);
    }

    @Override
    public Page<PlantDTO> implementPagination(List<Plant> allPlants, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name"));
        List<PlantDTO> plantDTOS = new ArrayList<>();

        for (Plant plant: allPlants) {
            PlantDTO plantDTO = modelMapper.map(plant,PlantDTO.class);
            if(plant.getCreator() != null){
                plantDTO.setCreator(plant.getCreator().getUsername());
            }
            plantDTOS.add(plantDTO);
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), plantDTOS.size());

        return new PageImpl<>(plantDTOS.subList(start, end), pageable, plantDTOS.size());
    }

    @Override
    public Page<PlantDTO> findPageable(int page, int size, String search) {
        List<Plant> allPlants = plantRepository.findAll();
        List<Plant> searchedPlants = new ArrayList<>();
        if (search != "") {
            for (Plant p: allPlants) {
                if(p.getName().toLowerCase().contains(search.toLowerCase()) || p.getFamily().toLowerCase().contains(search.toLowerCase())){
                    searchedPlants.add(p);
                }
            }
        } else {
            searchedPlants = allPlants;
        }
        return implementPagination(searchedPlants,page,size);
    }

    @Override
    public Page<PlantDTO> findAllMyPlants(int page, int size, String search, Principal principal) {
        List<Plant> plants = plantRepository.findAll();
        List<Plant> myPlants = new ArrayList<>();

        for (Plant p: plants) {
            if(p.getCreator().getUsername().equals(principal.getName())){
                if(search != ""){
                    if(p.getName().toLowerCase().contains(search.toLowerCase()) || p.getFamily().toLowerCase().contains(search.toLowerCase())){
                        myPlants.add(p);
                    }
                } else {
                    myPlants.add(p);
                }
            }
        }
        return implementPagination(myPlants, page, size);
    }

    @Override
    public int addToCollection(Principal principal, long id) {
        Plant plant = plantRepository.findById(id);
        User user = userService.findByUsername(principal.getName());

        if(user.getPlantCollection().contains(plant)){
            return -1;
        }
        user.getPlantCollection().add(plant);
        userService.save(user);
        return plant.getUsers().size();
    }

    @Override
    public int removeFromCollection(Principal principal, long id) {
        Plant plant = plantRepository.findById(id);
        User user = userService.findByUsername(principal.getName());

        if(!user.getPlantCollection().contains(plant)){
            return -1;
        }
        user.getPlantCollection().remove(plant);
        userService.save(user);
        return plant.getUsers().size();
    }

    @Override
    public boolean isLiked(Principal principal, long id) {
        Plant plant = plantRepository.findById(id);
        if(principal == null){
            return false;
        }
        User user = userService.findByUsername(principal.getName());

        if(plant.getUsers().contains(user)){
            return true;
        }
        return false;
    }

    @Override
    public List<PlantDTO> findAll() {

        List<Plant> plants = plantRepository.findAll();
        List<PlantDTO> plantDTOS = new ArrayList<>();

        for (Plant p: plants) {
            PlantDTO plantDTO = modelMapper.map(p, PlantDTO.class);
            plantDTO.setCreator(p.getCreator().getUsername());
            plantDTOS.add(plantDTO);
        }
        return plantDTOS;
    }

    @Override
    public Boolean deletePlant(long id) {
        if(plantRepository.findById(id) != null){
            plantRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public PlantDTO updatePlant(long id, PlantDTO plantDTO) {
        plantDTO.setId(id);
        Plant plant = plantRepository.findById(id);
        if(plant == null){
            return null;
        }
        modelMapper.map(plantDTO,plant);
        plantRepository.save(plant);
        return modelMapper.map(plant,PlantDTO.class);
    }
}
