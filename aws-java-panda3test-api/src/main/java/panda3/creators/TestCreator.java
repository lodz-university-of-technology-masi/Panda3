package panda3.creators;

import com.fasterxml.jackson.databind.JsonNode;
import panda3.model.Language;
import panda3.model.Question;
import panda3.model.Test;

import java.util.ArrayList;
import java.util.List;

public class TestCreator {
    public static Test createTestJSON(JsonNode body, List<Question> questions){
        Test test = new Test();
        JsonNode language = body.get("language");
        test.setTitle(body.get("title").asText());
        test.setLanguage(new Language(language.get("label").textValue(), language.get("value").textValue()));
        test.setQuestions(questions);
        return test;
    }

}