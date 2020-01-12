package panda3.validator;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import panda3.config.Config;
import panda3.mappers.TablesMapperTest;
import panda3.model.Participant;
import panda3.service.cognito.CognitoService;

import java.util.ArrayList;
import java.util.List;

public class AnswerValidator {

    private static final CognitoService cognitoService = new CognitoService();

    private static String checkTestId(String testId){
        try{
            if(new TablesMapperTest().getTest(testId) == null)
                return "such test don't exists. \n";
        }catch (Exception e){
            return "error in connection.";
        }
        return "";
    }


    public static String checkExistenceSingle(JsonNode body){
        String message = "";
        try{
            message = AnswerValidator.checkTestId(body.get("testId").asText());
            List<Participant> candidates = cognitoService.getUsersInGroup(Config.PARTICIPANT_GROUP);
            String userId = body.get("userId").asText();
            if(checkIfNotPresent(candidates, userId)){
                message += "such user don't exists.";
            }
            return message;
        }catch (Exception e){
            return "error in connection.";
        }
    }

    public static String checkExistenceWithList(JsonNode body){
        String message = "";
        try{
            message = AnswerValidator.checkTestId(body.get("testId").asText());
            List<Participant> candidates = new CognitoService().getUsersInGroup(Config.PARTICIPANT_GROUP);
            for(String id : (ArrayList<String>) new ObjectMapper().convertValue( body.get("users"), ArrayList.class)){
                if(checkIfNotPresent(candidates, id))
                    return message + "such user don't exists: " + id + "\n";
            }
        }catch (Exception e){
            return "error in connection.";
        }
        return message;
    }

    private static boolean checkIfNotPresent(List<Participant> candidates, String id) {
        boolean b = true;
        for (Participant candidate : candidates) {
            String participantId = candidate.getId();
            if (id.equals(participantId)) {
                b = false;
                break;
            }
        }
        return b;
    }
}
