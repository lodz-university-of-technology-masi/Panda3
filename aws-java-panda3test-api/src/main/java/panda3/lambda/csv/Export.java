package panda3.lambda.csv;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import panda3.responses.ApiResponseHandler;
import panda3.service.s3.BucketService;

import java.io.IOException;
import java.util.Map;

public class Export implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        BucketService bucketService = new BucketService();
        bucketService.downloadFile("test.csv");
        return ApiResponseHandler.createResponse("sucess.", 200);
    }
}
