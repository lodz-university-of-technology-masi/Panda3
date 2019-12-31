package panda3.lambda.answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import panda3.creators.TestAnswerCreator;
import panda3.mappers.TablesMapperAnswers;
import panda3.mappers.TablesMapperPaarticipant;
import panda3.mappers.TablesMapperTest;
import panda3.model.TestAnswer;
import panda3.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

public class CreateTestForUser implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            JsonNode body = new ObjectMapper().readTree((String) input.get("body"));
            new TablesMapperAnswers().saveTestAnswer(TestAnswerCreator.addUserToTest(body.get("userId").asText(), body.get("testId").asText()));
            return ApiResponseHandler.createResponse("sucess.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
