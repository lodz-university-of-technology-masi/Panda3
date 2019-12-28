package panda3.lambda.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.serverless.ApiGatewayResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import panda3.mappers.TablesMapperTest;
import panda3.model.Language;
import panda3.model.Question;
import panda3.model.Test;
import panda3.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class CreateTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        TablesMapperTest tablesMapperTest = new TablesMapperTest();
        Test test = new Test();
        try {
            LinkedHashMap<String, String> languageObject= (LinkedHashMap<String, String>) input.get("language");
            Language language = new Language(languageObject.get("label"), languageObject.get("value"));
            test.setTitle(input.get("title").toString());
            test.setLanguage(language);
            test.setQuestions((ArrayList<Question>) input.get("questions"));
            tablesMapperTest.saveTest(test);
            return ApiResponseHandler.createResponse("sucess.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
