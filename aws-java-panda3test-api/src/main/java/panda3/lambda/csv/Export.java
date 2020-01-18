package panda3.lambda.csv;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapperTest;
import panda3.model.Test;
import panda3.responses.ApiResponseHandler;
import panda3.service.s3.BucketService;

import java.io.IOException;
import java.util.Map;

public class Export implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");
        BucketService bucketService = new BucketService();
        try {
            Test test = new TablesMapperTest().getTest(pathParameters.get("id"));
            bucketService.downloadFile("public/" + pathParameters.get("id") +".csv", test);
            return ApiResponseHandler.createResponse("oksy.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("xd.", 402);
        }
    }
}
