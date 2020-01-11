package panda3.service.cognito;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import panda3.creators.ParticipantCreator;
import panda3.identificators.IdentyficatorsController;
import panda3.model.Participant;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class CognitoService {
    private static final Logger LOG = LogManager.getLogger(CognitoService.class);
    private AWSCognitoIdentityProvider identityProvider = AWSCognitoIdentityProviderClientBuilder.defaultClient();


    public List<Participant> getCognitoUsers(){
        ListUsersResult users = identityProvider.listUsers(new ListUsersRequest().withUserPoolId(IdentyficatorsController.USER_POOL_ID));
        return users.getUsers().stream().map(ParticipantCreator::CreateParticipant)
                .collect(Collectors.toList());
    }

    public Participant getCognitoUser(String id){
        List<Participant> participants = getCognitoUsers();
        Participant answer = null;
        for(Participant participant : participants){
            if(participant.getId().equals(id))
                answer = participant;
        }
        return answer;
    }

    public List<Participant> getParticipantsWithProfile(String profile){
        ListUsersInGroupResult users = identityProvider.listUsersInGroup(new ListUsersInGroupRequest().withGroupName(profile));
        return users.getUsers().stream().map(ParticipantCreator::CreateParticipant)
                .collect(Collectors.toList());
    }

    public boolean addUser(String name, String phone, String family_name, String email) throws IOException {
        AdminCreateUserResult result = identityProvider.adminCreateUser(new AdminCreateUserRequest().withUserPoolId(IdentyficatorsController.USER_POOL_ID)
       .withUsername(email)
                .withUserAttributes(
               new AttributeType().withName("name").withValue(name),
               new AttributeType().withName("phone_number").withValue(phone),
               new AttributeType().withName("family_name").withValue(family_name),
               new AttributeType().withName("email").withValue(email)
       ).withTemporaryPassword("Panda3Pass").withDesiredDeliveryMediums(DeliveryMediumType.EMAIL));
        if(result.getSdkHttpMetadata().getHttpStatusCode() < 300){
            //new TablesMapperPaarticipant().saveParticipant(ParticipantCreator.CreateParticipant(result.getUser()));
            return true;
        }
        return false;
    }

    public AdminDeleteUserResult deleteUser(String username){
        return identityProvider.adminDeleteUser(new AdminDeleteUserRequest().withUserPoolId(IdentyficatorsController.USER_POOL_ID).withUsername(username));
    }

}
