package panda3.mappers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.serverless.DynamoDBAdapter;
import panda3.model.TestAnswer;

import java.io.IOException;
import java.util.List;

public class TablesMapperAnswers {
    private DynamoDBAdapter db_adapter;
    private AmazonDynamoDB client;
    private DynamoDBMapper mapper;


    public TablesMapperAnswers(){
        DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
                .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride("answers_table"))
                .build();
        this.db_adapter = DynamoDBAdapter.getInstance();
        this.client = this.db_adapter.getDbClient();
        this.mapper = this.db_adapter.createDbMapper(mapperConfig);
    }


    public List<TestAnswer> getAllTestAnswers() throws IOException {
        List<TestAnswer> results = this.mapper.scan(TestAnswer.class, new DynamoDBScanExpression());
        return results;
    }


    public void saveTestAnswer(TestAnswer answer) throws IOException {
        this.mapper.save(answer);
    }
}
