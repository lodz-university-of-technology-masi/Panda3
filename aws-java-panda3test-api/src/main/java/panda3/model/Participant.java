package panda3.model;

public class Participant {
    private String id;
    private String login;
    private String email;
    private String name;
    private String surname;
    private String phone;

    public Participant(String id, String login, String email, String name, String surname, String phone) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
    }

    public Participant(){

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
