package panda3.model;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.serverless.DynamoDBAdapter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@DynamoDBTable(tableName = "participants_table")
public class Participant {
    private String id;
    private String name;

    public Participant(){
    }

    public Participant(Map<String, Object> body){
        this.name = body.get("name").toString();
    }

    @DynamoDBHashKey(attributeName = "id")
    @DynamoDBAutoGeneratedKey
    public String getId() {
        return id;
    }


    public void setId(String id) {
        this.id = id;
    }


    @DynamoDBAttribute(attributeName = "names")
    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }
}
