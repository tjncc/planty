package plantorganizer.dto;

import plantorganizer.helpers.RequestStatus;
import plantorganizer.helpers.WateringTime;
import plantorganizer.model.PlantRequest;

public class PlantRequestDTO {
    private String name;
    private String family;
    private WateringTime wateringTime;
    private String info;
    private RequestStatus requestStatus;
    private String image;

    public PlantRequestDTO(){

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFamily() {
        return family;
    }

    public void setFamily(String family) {
        this.family = family;
    }

    public WateringTime getWateringTime() {
        return wateringTime;
    }

    public void setWateringTime(WateringTime wateringTime) {
        this.wateringTime = wateringTime;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public RequestStatus getRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(RequestStatus requestStatus) {
        this.requestStatus = requestStatus;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
