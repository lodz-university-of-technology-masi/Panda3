package panda3.lambda.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapperTest;
import panda3.model.Test;
import panda3.responses.ApiResponseHandler;

import java.util.Map;

public class ReadTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");

        try {
            Test test = new TablesMapperTest().getTest(pathParameters.get("id"));
            if(test == null)
                return ApiResponseHandler.createResponse("nothing was found.", 200);
            return ApiResponseHandler.createResponse(test, 200);
        } catch (Exception  e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }

}
