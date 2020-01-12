package panda3.lambda.csv;

//1;O;EN;List at least two corporate values at IBM;|;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapperTest;
import panda3.model.Test;
import panda3.responses.ApiResponseHandler;

import java.io.File;
import java.io.IOException;
import java.util.Map;

public class Import implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private ObjectMapper mapper = new ObjectMapper();

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            BucketService bucketService = new BucketService();
            Test testAnswer = bucketService.uploadFile("test.csv");
            if(testAnswer == null)
                return ApiResponseHandler.createResponse("file not created.", 200);
            new TablesMapperTest().saveTest(testAnswer);
            return ApiResponseHandler.createResponse("sucess", 200);

        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
