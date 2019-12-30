package panda3.mappers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.serverless.DynamoDBAdapter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import panda3.model.Participant;
import panda3.model.Test;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

public class TablesMapperTest {
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
        this.mapper.delete(result);
    }

    public Test getTest(String id) throws IOException {
        List<Test> results = this.mapper.scan(Test.class, new DynamoDBScanExpression());
        return results.get(0);
    }
}
