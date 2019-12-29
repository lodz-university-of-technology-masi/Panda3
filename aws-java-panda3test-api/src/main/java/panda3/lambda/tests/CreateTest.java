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
import panda3.validator.TestValidator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class CreateTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private ObjectMapper mapper = new ObjectMapper();
    private TablesMapperTest tablesMapperTest;
    @Override

    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        this.tablesMapperTest = new TablesMapperTest();
        Test test = new Test();
        try {
            JsonNode body = new ObjectMapper().readTree((String) input.get("body"));
            JsonNode language = body.get("language");
            test.setTitle(body.get("title").asText());
            test.setLanguage(new Language(language.get("label").textValue(), language.get("value").textValue()));
            test.setQuestions(mapper.convertValue(body.get("questions"), ArrayList.class));
            this.tablesMapperTest.saveTest(test);
            return ApiResponseHandler.createResponse("sucess.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
