package panda3.lambda.paarticipants;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapperAnswers;
import panda3.mappers.TablesMapperPaarticipant;
import panda3.model.Participant;
import panda3.responses.ApiResponseHandler;
import panda3.service.cognito.CognitoService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public class ReadTestUsers  implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private TablesMapperAnswers mapperAnswers = new TablesMapperAnswers();
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");
        try {
            List<Participant> participants = mapperAnswers.getTestUsers(pathParameters.get("testId"));
            return ApiResponseHandler.createResponse(participants, 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
