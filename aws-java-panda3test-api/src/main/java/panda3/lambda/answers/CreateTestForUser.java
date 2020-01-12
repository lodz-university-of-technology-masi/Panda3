package panda3.lambda.answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapperAnswers;
import panda3.responses.ApiResponseHandler;
import panda3.validator.AnswerValidator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

public class CreateTestForUser implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private final ObjectMapper mapper = new ObjectMapper();
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            JsonNode body = mapper.readTree((String) input.get("body"));
            String message = AnswerValidator.checkExistenceWithList(body);
            if(!message.equals(""))
                return ApiResponseHandler.createResponse(message, 404);
            new TablesMapperAnswers().saveUsersToTest(body.get("testId").asText() ,mapper.convertValue( body.get("users"), ArrayList.class));
            return ApiResponseHandler.createResponse("success.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
