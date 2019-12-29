package panda3.lambda.testingLambdas;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
            JsonNode body = new ObjectMapper().readTree((String) input.get("body"));
            JsonNode language = body.get("language");

            return ApiResponseHandler.createResponse(language.get("label").textValue() + " " + language.get("value").textValue(), 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("problem", 401);
        }
    }

}
