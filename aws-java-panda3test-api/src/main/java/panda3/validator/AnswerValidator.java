package panda3.validator;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import panda3.identificators.IdentyficatorsController;
import panda3.mappers.TablesMapperTest;
import panda3.model.Participant;
import panda3.service.cognito.CognitoService;

import java.util.ArrayList;
import java.util.List;

public class AnswerValidator {

    private static CognitoService cognitoService = new CognitoService(); ;

    public static String checkTestId(String testId){
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
            List<Participant> candidates = cognitoService.getUsersInGroup(IdentyficatorsController.PARTICIPANT_GROUP);
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
            List<Participant> candidates = new CognitoService().getUsersInGroup(IdentyficatorsController.PARTICIPANT_GROUP);
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
        for (int i = 0, candidatesSize = candidates.size(); i < candidatesSize; i++) {
            Participant candidate = candidates.get(i);
            String participantId = candidate.getId();
            if (id.equals(participantId)) {
                b = false;
                break;
            }
        }
        return b;
    }
}
