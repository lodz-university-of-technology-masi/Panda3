package panda3.lambda.recruiter;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import panda3.creators.RecriterTestCreator;
import panda3.mappers.TablesMapperRecruiters;
import panda3.model.RecruiterTests;
import panda3.responses.ApiResponseHandler;
import panda3.validator.RecruiterTestValidator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

public class AddTestRecruiterTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            RecruiterTests recruiterTests;
            TablesMapperRecruiters tablesMapperRecruiters = new TablesMapperRecruiters();
            JsonNode body = new ObjectMapper().readTree((String) input.get("body"));
            if(!RecruiterTestValidator.checkUserTestId(body.get("userId").asText()))
                recruiterTests = RecriterTestCreator.createRecruiterTestJsonNode(body);
            else
                recruiterTests = RecriterTestCreator.addRecruiterTestJsonAddTests(body);
            tablesMapperRecruiters.addRecruiterTest(recruiterTests);
            return ApiResponseHandler.createResponse("sucess", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
