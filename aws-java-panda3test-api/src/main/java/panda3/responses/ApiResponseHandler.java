package panda3.responses;

import com.serverless.ApiGatewayResponse;

import java.util.Collections;

public class ApiResponseHandler {
    public static ApiGatewayResponse createResponse(Object objectBody, int code){
        return ApiGatewayResponse.builder()
                .setStatusCode(code)
                .setObjectBody(objectBody)
                .setHeaders(Collections.singletonMap("X-Powered-By", "AWS Lambda & serverless"))
                .build();
    }
}
