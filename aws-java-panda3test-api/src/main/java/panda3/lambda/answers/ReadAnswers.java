package panda3.lambda.answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapperAnswers;
import panda3.model.TestAnswer;
import panda3.responses.ApiResponseHandler;

import java.util.List;
import java.util.Map;

public class ReadAnswers implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> stringObjectMap, Context context) {

        try {
            List<TestAnswer> tests= new TablesMapperAnswers().getAllTestAnswers();
            return ApiResponseHandler.createResponse(tests, 200);
        } catch (Exception  e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
