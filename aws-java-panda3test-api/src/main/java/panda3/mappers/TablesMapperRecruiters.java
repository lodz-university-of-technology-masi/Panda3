package panda3.mappers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.serverless.DynamoDBAdapter;
import panda3.model.RecruiterTests;
import panda3.model.Test;
import panda3.model.TestAnswer;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TablesMapperRecruiters {
    private DynamoDBAdapter db_adapter;
    private AmazonDynamoDB client;
    private DynamoDBMapper mapper;

    public TablesMapperRecruiters(){
        DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
                .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride("recruiters_table"))
                .build();
        this.db_adapter = DynamoDBAdapter.getInstance();
        this.client = this.db_adapter.getDbClient();
        this.mapper = this.db_adapter.createDbMapper(mapperConfig);
    }





    public List<RecruiterTests> getRecruiterTests() throws IOException {
        List<RecruiterTests> results = this.mapper.scan(RecruiterTests.class, new DynamoDBScanExpression());
        return results;
    }



    public RecruiterTests getRecruiterTest(String userId) throws IOException {
        List<RecruiterTests> all = this.getRecruiterTests();
        for(RecruiterTests recruiterTests : all){
            if (recruiterTests.getUserId().equals(userId))
                return recruiterTests;
        }
        return null;
    }



    public void deleteRecruiterTest(String userId) throws IOException {
        RecruiterTests result = this.getRecruiterTest(userId);
        this.mapper.delete(result);
    }



    public void addRecruiterTest(RecruiterTests recruiterTests) {
        this.mapper.save(recruiterTests);
    }




    public void addTestForRecruiterTest(RecruiterTests recruiterTests) throws IOException {
        this.deleteRecruiterTest(recruiterTests.getUserId());
        this.addRecruiterTest(recruiterTests);
    }
}
