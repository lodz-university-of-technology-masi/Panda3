package panda3.validator;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import panda3.mappers.TablesMapperPaarticipant;
import panda3.mappers.TablesMapperTest;
import panda3.responses.ApiResponseHandler;
import panda3.service.cognito.CognitoService;

import java.util.ArrayList;

public class AnswerValidator {
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
            if(new TablesMapperPaarticipant().getAllParticipant(body.get("userId").asText()) == null)
                message += "such user don't exists.";
            return message;
        }catch (Exception e){
            return "error in connection.";
        }
    }

    public static String checkExistenceWithList(JsonNode body){
        String message = "";
        try{
            message = AnswerValidator.checkTestId(body.get("testId").asText());
            for(String id : (ArrayList<String>) new ObjectMapper().convertValue( body.get("users"), ArrayList.class)){
                if(new CognitoService().getCognitoUser(id) == null)
                    return message + "such user don't exists: " + id + "\n";
            }
        }catch (Exception e){
            return "error in connection.";
        }
        return message;
    }
}
