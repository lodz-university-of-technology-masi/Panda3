package panda3.lambda.answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapperAnswers;
import panda3.model.Participant;
import panda3.model.TestAnswer;
import panda3.responses.ApiResponseHandler;
import panda3.validator.AnswerValidator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ReadTestToCheck  implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");
        try {
            List<Participant> answer = new TablesMapperAnswers().getTestUsers(pathParameters.get("testId"));
            return ApiResponseHandler.createResponse(answer, 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
