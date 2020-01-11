package panda3.lambda.paarticipants;

import com.amazonaws.services.cognitoidp.model.UserType;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import panda3.model.Participant;
import panda3.responses.ApiResponseHandler;
import panda3.service.cognito.CognitoService;

import java.util.List;
import java.util.Map;

public class AddUser implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    private ObjectMapper mapper = new ObjectMapper();
    private CognitoService cognitoService = new CognitoService();

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            JsonNode user = mapper.readTree((String) input.get("body"));
            boolean success = cognitoService.addUser(user.get("name").asText(), user.get("phone").asText(), user.get("surname").asText(), user.get("email").asText());
            if(success) return ApiResponseHandler.createResponse("user added", 200);
            else return ApiResponseHandler.createResponse("Failed to add user", 402);
        } catch (Exception e) {
            return ApiResponseHandler.createResponse(e.getMessage(), 401);
        }
    }

}