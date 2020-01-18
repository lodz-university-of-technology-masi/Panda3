package panda3.lambda.recruiter;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import panda3.creators.TestCreator;
import panda3.mappers.TablesMapperTest;
import panda3.model.Test;
import panda3.responses.ApiResponseHandler;

import java.util.List;
import java.util.Map;

public class ReadRecruiterTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");
        TablesMapperTest tablesMapperTest = new TablesMapperTest();

        try{
            List<Test> recruiterTests = tablesMapperTest.getRecruiterTests(pathParameters.get("userId"));
            if(recruiterTests == null)
                return ApiResponseHandler.createResponse("id was not found.", 404);
            return ApiResponseHandler.createResponse(TestCreator.createRTestListResponse(recruiterTests), 200);
        }catch (Exception e){
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
