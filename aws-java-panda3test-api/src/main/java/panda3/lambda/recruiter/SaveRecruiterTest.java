package panda3.lambda.recruiter;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import panda3.creators.RecruiterTestCreator;
import panda3.mappers.TablesMapperRecruiters;
import panda3.mappers.TablesMapperTest;
import panda3.model.RecruiterTests;
import panda3.model.Test;
import panda3.responses.ApiResponseHandler;
import panda3.validator.RecruiterTestValidator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SaveRecruiterTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private static final Logger looger = LoggerFactory.getLogger(SaveRecruiterTest.class) ;

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");
        TablesMapperTest tablesMapperTest = new TablesMapperTest();
        TablesMapperRecruiters tablesMapperRecruiters = new TablesMapperRecruiters();

        try{
            Test test = tablesMapperTest.getAddedTest(pathParameters.get("userId"));
            RecruiterTests recruiterTests;
            List<String> testIds = new ArrayList<>();
            testIds.add(test.getId());

            if(!RecruiterTestValidator.checkUserTestId(pathParameters.get("userId")))
                recruiterTests = RecruiterTestCreator.createRecruiterTestJsonNode(pathParameters.get("userId"), testIds);
            else
                recruiterTests = RecruiterTestCreator.addRecruiterTestJsonAddTests(pathParameters.get("userId"), testIds);
            tablesMapperRecruiters.addRecruiterTest(recruiterTests);
            return ApiResponseHandler.createResponse("success.", 200);
        }catch(Exception e){
            return ApiResponseHandler.createResponse("error occured in save.", 501);
        }
    }
}
