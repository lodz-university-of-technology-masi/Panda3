package panda3.service.cognito;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import panda3.creators.ParticipantCreator;
import panda3.config.Config;
import panda3.model.Participant;

import java.util.List;
import java.util.stream.Collectors;

public class CognitoService {
    private static final Logger LOG = LogManager.getLogger(CognitoService.class);
    private final AWSCognitoIdentityProvider identityProvider = AWSCognitoIdentityProviderClientBuilder.defaultClient();

    public Participant getCognitoUser(String id){
        UserType user = identityProvider.listUsers(new ListUsersRequest().withUserPoolId(Config.USER_POOL_ID).withFilter("sub = \"" + id + "\"")).getUsers().get(0);
        return ParticipantCreator.CreateParticipant(user);
    }

    public List<Participant> getUsersInGroup(String group){
        ListUsersInGroupResult users = identityProvider.listUsersInGroup(
                new ListUsersInGroupRequest()
                        .withUserPoolId(Config.USER_POOL_ID)
                        .withGroupName(group));
        return users.getUsers().stream().map(ParticipantCreator::CreateParticipant)
                .collect(Collectors.toList());
    }

    public boolean addUser(String name, String phone, String family_name, String email) {
        AdminCreateUserResult result = identityProvider.adminCreateUser(new AdminCreateUserRequest().withUserPoolId(Config.USER_POOL_ID)
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
                            .withUserPoolId(Config.USER_POOL_ID)
                            .withGroupName(Config.PARTICIPANT_GROUP)
                            .withUsername(result.getUser().getUsername()));
            return addUserToGroupResult.getSdkHttpMetadata().getHttpStatusCode() < 300;
        }
        return false;
    }

    public AdminDeleteUserResult deleteUser(String username){
        return identityProvider.adminDeleteUser(new AdminDeleteUserRequest().withUserPoolId(Config.USER_POOL_ID).withUsername(username));
    }
}
