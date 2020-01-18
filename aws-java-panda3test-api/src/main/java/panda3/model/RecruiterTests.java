package panda3.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import java.util.List;

@DynamoDBTable(tableName = "recruiters_table")
public class RecruiterTests {
    private String userId;
    private List<String> testsNames;

    public RecruiterTests(){
    }

    @DynamoDBHashKey(attributeName = "userId")
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @DynamoDBAttribute(attributeName = "testsNames")
    public List<String> getTestsNames() {
        return testsNames;
    }

    public void setTestsNames(List<String> testsNames) {
        this.testsNames = testsNames;
    }
}
