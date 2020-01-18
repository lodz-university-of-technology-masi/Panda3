package panda3.creators;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import panda3.mappers.TablesMapperRecruiters;
import panda3.model.RecruiterTests;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class RecruiterTestCreator {
    public static RecruiterTests createRecruiterTestJsonNode(String id, List<String> testId){
        RecruiterTests recruiterTests = new RecruiterTests();
        recruiterTests.setUserId(id);
        recruiterTests.setTestIds(testId);
        return recruiterTests;
    }



    public static RecruiterTests addRecruiterTestJsonAddTests(String id, List<String> testId) throws IOException {
        RecruiterTests recruiterTests = new TablesMapperRecruiters().getRecruiterTest(id);
        if(!recruiterTests.getTestIds().contains(testId)){
            recruiterTests.setUserId(id);
            recruiterTests.getTestIds().addAll(testId);
        }
        return recruiterTests;
    }
}
