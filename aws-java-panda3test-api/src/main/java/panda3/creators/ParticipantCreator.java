package panda3.creators;

import com.amazonaws.services.cognitoidp.model.AttributeType;
import com.amazonaws.services.cognitoidp.model.UserType;
import panda3.model.Participant;

public class ParticipantCreator {
    public static Participant CreateParticipant(UserType userType){
        String email = "", name = "", surname = "", id = "", phone="";
        for (AttributeType attribute : userType.getAttributes()) {
            if (attribute.getName().equals("sub")) {
                id = attribute.getValue();
            }
            if (attribute.getName().equals("email")) {
                email = attribute.getValue();
            }
            if (attribute.getName().equals("name")) {
                name = attribute.getValue();
            }
            if (attribute.getName().equals("family_name")) {
                surname = attribute.getValue();
            }
            if (attribute.getName().equals("phone_number")) {
                phone = attribute.getValue();
            }
        }

        return new Participant(id, email, name, surname, phone);
    }
}
