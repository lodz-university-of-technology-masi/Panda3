package panda3.lambda.paarticipants;


import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapperPaarticipant;
import panda3.mappers.TablesMapperTest;
import panda3.model.Participant;
import panda3.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.Map;

public class CreateParticipant implements RequestHandler<Map<String, Object>, ApiGatewayResponse>{

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        TablesMapperPaarticipant tablesMapperPaarticipant = new TablesMapperPaarticipant();
        Participant participant = new Participant();
        try {
            JsonNode body = new ObjectMapper().readTree((String) input.get("body"));
            participant.setName(body.get("name").asText());
            participant.setSurname(body.get("surname").asText());
            tablesMapperPaarticipant.saveParticipant(participant);
            return ApiResponseHandler.createResponse("sucess.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
