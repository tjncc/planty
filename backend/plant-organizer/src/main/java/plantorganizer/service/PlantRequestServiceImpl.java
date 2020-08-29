package plantorganizer.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import plantorganizer.dto.PlantDTO;
import plantorganizer.dto.PlantRequestDTO;
import plantorganizer.helpers.RequestStatus;
import plantorganizer.model.PlantRequest;
import plantorganizer.repository.PlantRequestRepository;
import plantorganizer.service.interfaces.PlantRequestService;
import plantorganizer.service.interfaces.PlantService;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlantRequestServiceImpl implements PlantRequestService {

    @Autowired
    PlantRequestRepository plantRequestRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    PlantService plantService;

    @Override
    public PlantRequestDTO save(PlantDTO plantDTO) {
        PlantRequest request = modelMapper.map(plantDTO, PlantRequest.class);
        request.setRequestStatus(RequestStatus.PENDING);
        PlantRequest plant = plantRequestRepository.save(request);
        return modelMapper.map(plant, PlantRequestDTO.class);
    }

    @Override
    public List<PlantRequestDTO> findAll() {
        List<PlantRequest> requests = plantRequestRepository.findAll();
        List<PlantRequestDTO> requestDTOS = new ArrayList<>();

        for (PlantRequest request : requests) {
            PlantRequestDTO requestDTO = modelMapper.map(request,PlantRequestDTO.class);
            requestDTOS.add(requestDTO);
        }
        return requestDTOS;
    }

    @Override
    public PlantRequestDTO findById(long id) {
        PlantRequest request = plantRequestRepository.findById(id);
        if(request == null){
            return null;
        }
        return modelMapper.map(request,PlantRequestDTO.class);
    }

    @Override
    public boolean approveRequest(long id) {
        PlantRequest request = plantRequestRepository.findById(id);
        if(request == null || !request.getRequestStatus().equals(RequestStatus.PENDING)){
            return false;
        }
        PlantDTO plantDTO = modelMapper.map(request,PlantDTO.class);
        request.setRequestStatus(RequestStatus.ACCEPTED);
        plantService.save(plantDTO);
        return true;
    }

    @Override
    public boolean declineRequest(long id) {
        PlantRequest request = plantRequestRepository.findById(id);
        if(request == null || !request.getRequestStatus().equals(RequestStatus.PENDING)){
            return false;
        }
        request.setRequestStatus(RequestStatus.CANCELLED);
        plantRequestRepository.save(request);
        return true;
    }
}
