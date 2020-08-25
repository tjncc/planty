package plantorganizer.dto;

import plantorganizer.helpers.WateringTime;
import plantorganizer.model.Plant;

public class PlantDTO {

    private String name;
    private String family;
    private WateringTime wateringTime;
    private String info;

    public PlantDTO(){

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
}
