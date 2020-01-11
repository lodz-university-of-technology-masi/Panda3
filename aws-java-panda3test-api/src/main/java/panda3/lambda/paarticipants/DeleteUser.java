package panda3.lambda.paarticipants;

import com.amazonaws.services.cognitoidp.model.AdminDeleteUserResult;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import panda3.responses.ApiResponseHandler;
import panda3.service.cognito.CognitoService;

import java.util.Map;

public class DeleteUser implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    private CognitoService cognitoService = new CognitoService();

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            JsonNode body = new ObjectMapper().readTree((String) input.get("body"));
            AdminDeleteUserResult result = cognitoService.deleteUser(body.asText());
            return ApiResponseHandler.createResponse("Success", result.getSdkHttpMetadata().getHttpStatusCode());
        } catch (Exception e) {
            return ApiResponseHandler.createResponse(e.getMessage(), 401);
        }
    }

}


