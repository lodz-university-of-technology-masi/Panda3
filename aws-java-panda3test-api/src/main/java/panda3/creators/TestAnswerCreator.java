package panda3.creators;

import panda3.model.TestAnswer;

import java.util.List;

public class TestAnswerCreator {
    public static TestAnswer addUserToTest(String userId, String testId){
        TestAnswer answer = new TestAnswer();
        answer.setUserId(userId);
        answer.setTestId(testId);
        answer.setAnswers(null);
        answer.setResult(null);
        return answer;
    }

    public static TestAnswer addUserAnswer(TestAnswer answer, List<String> answers){
        answer.setAnswers(answers);
        answer.setResult(null);
        return answer;
    }



    public static TestAnswer addRecruiterResult(TestAnswer answer, String result){
        answer.setResult(result);
        return answer;
    }
}
