package panda3.lambda.paarticipants;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapperPaarticipant;
import panda3.mappers.TablesMapperTest;
import panda3.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.Map;

public class DeleteParticipant implements RequestHandler<Map<String, Object>, ApiGatewayResponse>{

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {

        try {
            TablesMapperPaarticipant tablesMapperPaarticipant = new TablesMapperPaarticipant();
            tablesMapperPaarticipant.deleteParticipant(input.get("id").toString());
            return ApiResponseHandler.createResponse("sucess.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }

}