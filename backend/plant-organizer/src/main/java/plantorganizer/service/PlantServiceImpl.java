package plantorganizer.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import plantorganizer.dto.NewPlantDTO;
import plantorganizer.dto.PlantDTO;
import plantorganizer.model.Plant;
import plantorganizer.model.User;
import plantorganizer.repository.PlantRepository;
import plantorganizer.service.interfaces.PlantService;
import plantorganizer.service.interfaces.UserService;

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
        return modelMapper.map(plant, PlantDTO.class);
    }

    @Override
    public PlantDTO findByName(String name) {

        Plant plant = plantRepository.findByName(name);
        if(plant == null){
            return null;
        }
        return modelMapper.map(plant, PlantDTO.class);
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
        Plant plant = plantRepository.findById(id);
        if(plant == null){
            return null;
        }
        modelMapper.map(plantDTO,plant);
        plantRepository.save(plant);
        return modelMapper.map(plant,PlantDTO.class);
    }

    @Override
    public Page<PlantDTO> findPageable(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name"));
        List<Plant> allPlants = plantRepository.findAll();
        List<PlantDTO> plantDTOS = new ArrayList<>();

        for (Plant plant: allPlants) {
            PlantDTO plantDTO = modelMapper.map(plant,PlantDTO.class);
            plantDTOS.add(plantDTO);
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), plantDTOS.size());

        return new PageImpl<>(plantDTOS.subList(start, end), pageable, plantDTOS.size());
    }


}
