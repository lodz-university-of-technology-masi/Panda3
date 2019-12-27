package panda3.lambda.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapper;
import panda3.model.Test;
import panda3.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.Map;

public class CreateTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        TablesMapper tablesMapper = new TablesMapper("tests_table");
        Test test = new Test();
        test.setTitle(input.get("title").toString());
        try {
            tablesMapper.saveTest(test);
            return ApiResponseHandler.createResponse("sucess.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
