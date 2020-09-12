package plantorganizer.dto;

import plantorganizer.model.User;

public class UserDTO {

    private long id;
    private String username;
    private String email;
    private String role;

    public UserDTO(){

    }

    public UserDTO(String username, String email, String role) {
        this.username = username;
        this.email = email;
        this.role = role;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserDTO(User user){
        this(user.getUsername(), user.getEmail(), user.getRole().toString());
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
