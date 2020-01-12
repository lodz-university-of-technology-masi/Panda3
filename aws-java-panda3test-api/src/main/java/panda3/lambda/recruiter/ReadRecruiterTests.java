package panda3.lambda.recruiter;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapperRecruiters;
import panda3.responses.ApiResponseHandler;

import java.util.ArrayList;
import java.util.Map;

public class ReadRecruiterTests implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            TablesMapperRecruiters tablesMapperRecruiters = new TablesMapperRecruiters();
            return ApiResponseHandler.createResponse(new ObjectMapper().convertValue( tablesMapperRecruiters.getRecruiterTests(), ArrayList.class), 200);
        } catch (Exception e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
