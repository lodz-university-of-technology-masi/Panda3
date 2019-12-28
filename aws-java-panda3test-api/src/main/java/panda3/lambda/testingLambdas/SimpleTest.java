package panda3.lambda.testingLambdas;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import panda3.mappers.TablesMapperPaarticipant;
import panda3.mappers.TablesMapperTest;
import panda3.model.Participant;
import com.serverless.ApiGatewayResponse;
import panda3.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public class SimpleTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {

        try {
            List<Participant> participants= new TablesMapperPaarticipant().getAllParticipants();
            return ApiResponseHandler.createResponse(participants, 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("problem", 401);
        }
    }

}
