package plantorganizer.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import plantorganizer.dto.PlantDTO;
import plantorganizer.model.Plant;
import plantorganizer.repository.PlantRepository;
import plantorganizer.service.interfaces.PlantService;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlantServiceImpl implements PlantService {

    @Autowired
    PlantRepository plantRepository;

    @Autowired
    ModelMapper modelMapper;

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
        plantRepository.save(plant);
        return plantDTO;
    }

    @Override
    public List<PlantDTO> findAll() {

        List<Plant> plants = plantRepository.findAll();
        List<PlantDTO> plantDTOS = new ArrayList<>();

        for (Plant p: plants) {
            PlantDTO plantDTO = modelMapper.map(p, PlantDTO.class);
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


}
