package panda3.mappers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
import com.amazonaws.services.dynamodbv2.document.utils.ValueMap;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.serverless.DynamoDBAdapter;
import panda3.creators.TestAnswerCreator;
import panda3.model.TestAnswer;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TablesMapperAnswers {
    private DynamoDBAdapter db_adapter;
    private AmazonDynamoDB client;
    private DynamoDBMapper mapper;


    public TablesMapperAnswers(){
        DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
                .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride("answer_table"))
                .build();
        this.db_adapter = DynamoDBAdapter.getInstance();
        this.client = this.db_adapter.getDbClient();
        this.mapper = this.db_adapter.createDbMapper(mapperConfig);
    }


    public List<TestAnswer> getAllTestAnswers() throws IOException {
        List<TestAnswer> results = this.mapper.scan(TestAnswer.class, new DynamoDBScanExpression());
        return results;
    }


    public TestAnswer getUserTestAnswers(String userId, String testId) throws IOException {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
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

    public TestAnswer getTestAnswer(String id) throws IOException {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":v_t_id", new AttributeValue().withS(id));
        DynamoDBQueryExpression<TestAnswer> query = new DynamoDBQueryExpression<TestAnswer>()
                .withKeyConditionExpression("testId = :v_t_id")
                .withExpressionAttributeValues(eav);
        return this.mapper.query(TestAnswer.class, query).get(0);
    }

    public void saveTestAnswer(TestAnswer answer) throws IOException {
        this.mapper.save(answer);
    }



    public void saveUsersToTest(String testId, List<String> userId) throws IOException {
        for(String uId : userId)
            this.mapper.save(TestAnswerCreator.addUserToTest(uId, testId));
    }

    public void updateTestAnswer(TestAnswer answer) throws IOException {
        this.deleteTestAnswer(answer.getTestId());
        this.mapper.save(answer);
    }
}
