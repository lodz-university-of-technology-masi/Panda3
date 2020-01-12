package panda3.validator;

import panda3.mappers.TablesMapperRecruiters;

import java.io.IOException;

public class RecruiterTestValidator {
    public static boolean checkUserTestId(String userId) throws IOException {
        return new TablesMapperRecruiters().getRecruiterTest(userId) != null;
    }
}
