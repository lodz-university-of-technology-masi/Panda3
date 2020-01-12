package panda3.mappers;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.serverless.DynamoDBAdapter;
import panda3.creators.TestAnswerCreator;
import panda3.config.Config;
import panda3.model.Participant;
import panda3.model.TestAnswer;
import panda3.model.TestResult;
import panda3.service.cognito.CognitoService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class TablesMapperAnswers {
    private final DynamoDBMapper mapper;
    private final CognitoService cognitoService;


    public TablesMapperAnswers(){
        DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
                .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride("answer_table"))
                .build();
        DynamoDBAdapter db_adapter = DynamoDBAdapter.getInstance();
        this.mapper = db_adapter.createDbMapper(mapperConfig);
        this.cognitoService = new CognitoService();
    }


    public List<TestAnswer> getAllTestAnswers() {
        return this.mapper.scan(TestAnswer.class, new DynamoDBScanExpression());
    }


    public TestAnswer getUserTestAnswers(String userId, String testId) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":v_u_id", new AttributeValue().withS(userId));
        eav.put(":v_t_id", new AttributeValue().withS(testId));
        DynamoDBQueryExpression<TestAnswer> query = new DynamoDBQueryExpression<TestAnswer>()
                .withKeyConditionExpression("userId = :v_u_id and testId = :v_t_id")
                .withExpressionAttributeValues(eav);
        return this.mapper.query(TestAnswer.class, query).get(0);
    }

    public void deleteTestAnswer(String id) throws IOException {
        TestAnswer result = this.getTestAnswer(id);
        this.mapper.delete(result);
    }

    public TestAnswer getTestAnswer(String id) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":v_t_id", new AttributeValue().withS(id));
        DynamoDBQueryExpression<TestAnswer> query = new DynamoDBQueryExpression<TestAnswer>()
                .withKeyConditionExpression("testId = :v_t_id")
                .withExpressionAttributeValues(eav);
        return this.mapper.query(TestAnswer.class, query).get(0);
    }

    public List<Participant> getTestUsers(String testId) throws IOException{
        List<TestAnswer> answers = getObjectsWithTestId(testId);
        List<Participant> candidates = cognitoService.getUsersInGroup(Config.PARTICIPANT_GROUP);
        return candidates.stream().filter(
                participant -> answers.stream()
                        .anyMatch(answer -> participant.getId()
                                .contentEquals(answer.getUserId())))
                .collect(Collectors.toList());
    }

    public List<Participant> getTestSubmissions(String testId) throws IOException {
        List<TestAnswer> answers = getObjectsWithTestId(testId);
        List<Participant> result = new ArrayList<>();
        for(TestAnswer an : answers){
            if(an.getResult() == null && an.getAnswers() != null)
                result.add(cognitoService.getCognitoUser(an.getUserId()));
        }
        return result;
    }


    public List<TestResult> getResultUser(String userId) throws IOException{
        List<TestAnswer> all = this.getUserTests(userId);
        List<TestResult> answer = new ArrayList<>();
        for(TestAnswer ans : all){
            if(ans.getResult() != null)

                answer.add(new TestResult(new TablesMapperTest().getTest(ans.getTestId()).getTitle()  , ans.getResult()));
        }

        return answer;
    }


    private List<TestAnswer> getObjectsWithTestId(String testId) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":val1", new AttributeValue().withS(testId));
        DynamoDBScanExpression scanRequest = new DynamoDBScanExpression()
                .withFilterExpression("testId = :val1")
                .withExpressionAttributeValues(eav);
        return this.mapper.scan(TestAnswer.class, scanRequest);
    }

    public void saveTestAnswer(TestAnswer answer) {
        this.mapper.save(answer);
    }

    public void saveUsersToTest(String testId, List<String> userId) {
        for(String uId : userId)
            this.mapper.save(TestAnswerCreator.addUserToTest(uId, testId));
    }

    public void updateTestAnswer(TestAnswer answer) {
        this.mapper.delete(answer);
        this.mapper.save(answer);
    }


    public List<TestAnswer> getUserTests(String userId) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":val1", new AttributeValue().withS(userId));
        DynamoDBScanExpression scanRequest = new DynamoDBScanExpression()
                .withFilterExpression("userId = :val1")
                .withExpressionAttributeValues(eav);
        return this.mapper.scan(TestAnswer.class, scanRequest);
    }

    public void deleteAllTestsOnList(String testId) throws IOException{
        List<TestAnswer> tests =  this.getObjectsWithTestId(testId);
        for(TestAnswer answer : tests){
            this.mapper.delete(answer);
        }
    }
}
