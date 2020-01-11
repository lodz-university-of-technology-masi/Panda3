package panda3.creators;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import panda3.mappers.TablesMapperRecruiters;
import panda3.model.RecruiterTests;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class RecriterTestCreator {
    public static RecruiterTests createRecruiterTestJsonNode(JsonNode body){
        RecruiterTests recruiterTests = new RecruiterTests();
        recruiterTests.setUserId(body.get("userId").asText());
        recruiterTests.setTestIds(new ObjectMapper().convertValue( body.get("testIds"), ArrayList.class));
        return recruiterTests;
    }



    public static RecruiterTests addRecruiterTestJsonAddTests(JsonNode body) throws IOException {
        RecruiterTests recruiterTests = new TablesMapperRecruiters().getRecruiterTest(body.get("userId").asText());
        recruiterTests.getTestIds().addAll(new ObjectMapper().convertValue( body.get("testIds"), ArrayList.class));
        return recruiterTests;
    }
}
