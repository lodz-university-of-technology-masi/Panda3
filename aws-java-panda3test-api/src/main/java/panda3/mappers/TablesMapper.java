package panda3.mappers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.serverless.DynamoDBAdapter;
import panda3.model.Participant;
import panda3.model.Test;

import java.io.IOException;
import java.util.List;

public class TablesMapper {
    private DynamoDBAdapter db_adapter;
    private AmazonDynamoDB client;
    private DynamoDBMapper mapper;

    public TablesMapper(String tableName){
        DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
                .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride(tableName))
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


    public Participant getAllParticipant(String id) throws IOException {
        Participant result = this.mapper.load(Participant.class, id);
        return result;
    }


    public List<Participant> getAllParticipants() throws IOException {
        DynamoDBScanExpression scanExp = new DynamoDBScanExpression();
        List<Participant> results = this.mapper.scan(Participant.class, scanExp);
        return results;
    }


    public void saveParticipant(Participant participant) throws IOException {
        this.mapper.save(participant);
    }




    public void deleteParticipant(String id) throws IOException {
        Participant result = this.mapper.load(Participant.class, id);
        this.mapper.delete(result);
    }
}
