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

public class CreateAnswer implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private ObjectMapper mapper = new ObjectMapper();
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            TablesMapperAnswers tablesMapperAnswers = new TablesMapperAnswers();
            JsonNode body = new ObjectMapper().readTree((String) input.get("body"));
            if(new TablesMapperTest().getTest(body.get("testId").asText()) == null)
                return ApiResponseHandler.createResponse("such user don't exists.", 200);
            if(new TablesMapperPaarticipant().getAllParticipant(body.get("userId").asText()) == null)
                return ApiResponseHandler.createResponse("such test don't exists.", 200);
            TestAnswer answer = tablesMapperAnswers.getUserTestAnswers(body.get("userId").asText(), body.get("testId").asText());
            tablesMapperAnswers.updateTestAnswer(TestAnswerCreator.addUserAnswer(answer, new ObjectMapper().convertValue( body.get("answers"), ArrayList.class)));
            return ApiResponseHandler.createResponse(answer, 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }

}
