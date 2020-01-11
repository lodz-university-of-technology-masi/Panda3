package panda3.service.cognito;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import panda3.creators.ParticipantCreator;
import panda3.identificators.IdentyficatorsController;
import panda3.mappers.TablesMapperAnswers;
import panda3.model.Participant;
import panda3.model.TestAnswer;

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

    public List<Participant> getUsersInGroup(String group){
        ListUsersInGroupResult users = identityProvider.listUsersInGroup(
                new ListUsersInGroupRequest()
                        .withUserPoolId(IdentyficatorsController.USER_POOL_ID)
                        .withGroupName(group));
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
            AdminAddUserToGroupResult addUserToGroupResult = identityProvider.adminAddUserToGroup(
                    new AdminAddUserToGroupRequest()
                            .withUserPoolId(IdentyficatorsController.USER_POOL_ID)
                            .withGroupName(IdentyficatorsController.PARTICIPANT_GROUP)
                            .withUsername(result.getUser().getUsername()));
            if (addUserToGroupResult.getSdkHttpMetadata().getHttpStatusCode() < 300) return true;
        }
        return false;
    }

    public AdminDeleteUserResult deleteUser(String username){
        return identityProvider.adminDeleteUser(new AdminDeleteUserRequest().withUserPoolId(IdentyficatorsController.USER_POOL_ID).withUsername(username));
    }
}
