package panda3.lambda.recruiter;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapperRecruiters;
import panda3.model.RecruiterTests;
import panda3.responses.ApiResponseHandler;

import java.util.Map;

public class ReadRecruiterTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");
        TablesMapperRecruiters tablesMapperRecruiters = new TablesMapperRecruiters();

        try{
            RecruiterTests recruiterTests = tablesMapperRecruiters.getRecruiterTest(pathParameters.get("userId"));
            if(recruiterTests == null)
                return ApiResponseHandler.createResponse("id was not found.", 404);
            return ApiResponseHandler.createResponse(recruiterTests.getTestIds(), 200);
        }catch (Exception e){
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
