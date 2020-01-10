package panda3.lambda.paarticipants;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import panda3.identificators.IdentyficatorsController;
import panda3.model.Participant;
import panda3.responses.ApiResponseHandler;
import panda3.service.cognito.CognitoService;

import java.util.List;
import java.util.Map;

public class ReadParticipants implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> stringObjectMap, Context context) {
        try {
            List<Participant> participants = new CognitoService().getParticipantsWithProfile(IdentyficatorsController.PARTICIPANT_GROUPE);
            return ApiResponseHandler.createResponse(participants, 200);
        } catch (Exception e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
