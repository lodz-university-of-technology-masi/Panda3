package panda3.mappers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.serverless.DynamoDBAdapter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import panda3.model.Participant;
import panda3.model.Test;
import panda3.model.TestAnswer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class    TablesMapperTest {
    private DynamoDBAdapter db_adapter;
    private AmazonDynamoDB client;
    private DynamoDBMapper mapper;


    public TablesMapperTest(){
        DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
                .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride("tests_table"))
                .build();
        this.db_adapter = DynamoDBAdapter.getInstance();
        this.client = this.db_adapter.getDbClient();
        this.mapper = this.db_adapter.createDbMapper(mapperConfig);
    }


    public List<Test> getAllTests() throws IOException {
        List<Test> results = this.mapper.scan(Test.class, new DynamoDBScanExpression());
        return results;
    }


    public void saveTest(Test test) throws IOException {
        this.mapper.save(test);
    }

    public void deleteTest(String id) throws IOException {
        Test result = this.getTest(id);
        new TablesMapperAnswers().deleteAllTestsOnList(id);
        this.mapper.delete(result);
    }

    public Test getTest(String id) throws IOException {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":t_id", new AttributeValue().withS(id));
        DynamoDBQueryExpression<Test> query = new DynamoDBQueryExpression<Test>()
                .withKeyConditionExpression("id = :t_id")
                .withExpressionAttributeValues(eav);
        return this.mapper.query(Test.class, query).get(0);
    }



    public List<Test> getUserTest(String userId) throws IOException {
        List<TestAnswer> ans = new TablesMapperAnswers().getUserTests(userId);
        List<Test> answer = new ArrayList<>();
        for(TestAnswer an : ans){
            if(an.getAnswers() == null)
                answer.add(this.getTest(an.getTestId()));
        }
        return answer;
    }
}
