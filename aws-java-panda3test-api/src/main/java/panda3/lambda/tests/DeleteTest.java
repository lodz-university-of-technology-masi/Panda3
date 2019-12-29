package panda3.lambda.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapperTest;
import panda3.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.Map;

public class DeleteTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private TablesMapperTest tablesMapperTest;

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        tablesMapperTest = new TablesMapperTest();
        try {
            JsonNode body = new ObjectMapper().readTree((String) input.get("body"));
            tablesMapperTest.deleteTest(body.get("id").textValue());
            return ApiResponseHandler.createResponse("sucess.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }

}
