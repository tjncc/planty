package plantorganizer.model;

import plantorganizer.helpers.WateringTime;

import javax.persistence.*;

@Entity
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String family;

    @Column(nullable = false)
    private WateringTime wateringTime;

    @Column
    private String info;

    @Column(columnDefinition="text", length=10485760)
    private String image;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "creator_id")
    private User creator;

    public Plant(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }
}
