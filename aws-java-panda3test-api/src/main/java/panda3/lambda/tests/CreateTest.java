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
    private final Logger logger = LogManager.getLogger(this.getClass());

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        TablesMapperTest tablesMapperTest = new TablesMapperTest();
        ObjectMapper mapper = new ObjectMapper();
        Test test = new Test();
        Language language = new Language();
        List<Question> questions;




        try {
            Gson gson = new Gson();
            questions = (ArrayList<Question>) input.get("questions");
            LinkedHashMap<String, String> languageObject= (LinkedHashMap<String, String>) input.get("language");
            logger.error("Error language. " + languageObject.get("label") + " " + languageObject.get("value"));
            String label = languageObject.get("label").toString();
            String value = languageObject.get("value").toString();
            language.setLabel(label);
            language.setValue(value);
            test.setTitle(input.get("title").toString());
            test.setLanguage(language);
            test.setQuestions(questions);
            tablesMapperTest.saveTest(test);
            return ApiResponseHandler.createResponse("sucess.", 200);
        } catch (IOException e) {
            logger.error("Error in saving product: " + e);
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
