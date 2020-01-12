package panda3.lambda.participants;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import panda3.config.Config;
import panda3.model.Participant;
import panda3.responses.ApiResponseHandler;
import panda3.service.cognito.CognitoService;

import java.util.List;
import java.util.Map;

public class ReadRecruiters implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    private final CognitoService cognitoService = new CognitoService();
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            List<Participant> participants = cognitoService.getUsersInGroup(Config.RECRUITERS_GROUP);
            return ApiResponseHandler.createResponse(participants, 200);
        } catch (Exception e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
