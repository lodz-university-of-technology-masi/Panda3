package panda3.lambda.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapperTest;
import panda3.model.Language;
import panda3.model.Question;
import panda3.model.Test;
import panda3.responses.ApiResponseHandler;
import panda3.validator.TestValidator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

public class UpdateTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        TablesMapperTest tablesMapperTest = new TablesMapperTest();
        return ApiResponseHandler.createResponse("sucess.", 200);
    }

}
