package panda3.service.cognito;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import panda3.creators.ParticipantCreator;
import panda3.identificators.IdentyficatorsController;
import panda3.model.Participant;

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

}
