package panda3.lambda.answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapperAnswers;
import panda3.model.TestAnswer;
import panda3.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

public class CreateAnswer implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private ObjectMapper mapper = new ObjectMapper();
    private TablesMapperAnswers tablesMapperAnswers;
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        this.tablesMapperAnswers = new TablesMapperAnswers();
        TestAnswer answer = new TestAnswer();
        try {
            JsonNode body = new ObjectMapper().readTree((String) input.get("body"));
            answer.setTestId(body.get("testId").asText());
            answer.setUserId(body.get("userId").asText());
            answer.setAnswers(body.get("answers").asText());
            tablesMapperAnswers.saveTestAnswer(answer);
            return ApiResponseHandler.createResponse("sucess.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }

}
