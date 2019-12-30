package panda3.lambda.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapperTest;
import panda3.model.Test;
import panda3.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.Map;

public class ReadTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");
        try {
            //Test test = ;
            return ApiResponseHandler.createResponse(new TablesMapperTest().getTest(pathParameters.get("id")), 200);
        } catch (Exception e) {
            return ApiResponseHandler.createResponse(e.getMessage(), 401);
        }
    }

}
