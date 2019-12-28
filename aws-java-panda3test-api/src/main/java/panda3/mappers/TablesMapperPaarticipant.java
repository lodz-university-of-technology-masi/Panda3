package panda3.mappers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.serverless.DynamoDBAdapter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import panda3.model.Participant;

import java.io.IOException;
import java.util.List;

public class TablesMapperPaarticipant {
    private final Logger logger = LogManager.getLogger(this.getClass());
    private DynamoDBAdapter db_adapter;
    private AmazonDynamoDB client;
    private DynamoDBMapper mapper;


    public TablesMapperPaarticipant(){
        DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
                .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride("participants_table"))
                .build();
        this.db_adapter = DynamoDBAdapter.getInstance();
        this.client = this.db_adapter.getDbClient();
        this.mapper = this.db_adapter.createDbMapper(mapperConfig);
    }

    public Participant getAllParticipant(String id) throws IOException {
        return this.mapper.load(Participant.class, id);
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
