package panda3.lambda.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import panda3.creators.TestCreator;
import panda3.mappers.TablesMapperRecruiters;
import panda3.mappers.TablesMapperTest;
import panda3.model.RecruiterTests;
import panda3.model.Test;
import panda3.responses.ApiResponseHandler;
import sun.security.x509.AttributeNameEnumeration;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CreateTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");
        TablesMapperTest tablesMapperTest = new TablesMapperTest();
        TablesMapperRecruiters tablesMapperRecruiters = new TablesMapperRecruiters();
        Test test;
        try {
            JsonNode body = mapper.readTree((String) input.get("body"));
            test = TestCreator.createTestJSON(body, mapper.convertValue(body.get("questions"), ArrayList.class), pathParameters.get("id"));
            tablesMapperTest.saveTest(test);
            Test test2 = tablesMapperTest.getAddedTest(pathParameters.get("id"));
            return ApiResponseHandler.createResponse("success.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
