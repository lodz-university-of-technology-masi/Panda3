package panda3.mappers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.serverless.DynamoDBAdapter;
import panda3.model.RecruiterTests;
import panda3.model.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class TablesMapperRecruiters {
    private final DynamoDBMapper mapper;

    public TablesMapperRecruiters(){
        DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
                .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride("recruiters_table"))
                .build();
        DynamoDBAdapter db_adapter = DynamoDBAdapter.getInstance();
        this.mapper = db_adapter.createDbMapper(mapperConfig);
    }





    public List<RecruiterTests> getRecruiterTests() {
        return this.mapper.scan(RecruiterTests.class, new DynamoDBScanExpression());
    }



    public RecruiterTests getRecruiterTest(String userId) throws IOException {
        List<RecruiterTests> all = this.getRecruiterTests();
        for(RecruiterTests recruiterTests : all){
            if (recruiterTests.getUserId().equals(userId))
                return recruiterTests;
        }
        return null;
    }



    public List<Test> getRecuiterTestObjectLists(String userId) throws IOException{
        TablesMapperTest tablesMapperTest = new TablesMapperTest();
        List<String> testId = this.getRecruiterTest(userId).getTestIds();
        List<Test> tests = new ArrayList<Test>();
        for (String id : testId){
            tests.add(tablesMapperTest.getTest(id));
        }
        return tests;
    }



    private void deleteRecruiterTest(String userId) throws IOException {
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
