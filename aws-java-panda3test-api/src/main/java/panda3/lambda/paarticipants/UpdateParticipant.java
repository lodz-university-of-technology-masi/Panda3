package panda3.lambda.paarticipants;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import panda3.model.Participant;
import panda3.validator.ParticipantValidator;

import java.util.logging.Logger;

public class UpdateParticipant implements RequestHandler<Participant, String>{

    @Override
    public String handleRequest(Participant input, Context context) {
        AmazonDynamoDB a = AmazonDynamoDBClientBuilder.defaultClient();
        DynamoDBMapper dynamoDBMapper = new DynamoDBMapper(AmazonDynamoDBClientBuilder.defaultClient());
        if(ParticipantValidator.checkNull(input)) {
            return "you cannot insert empty object";
        }
        dynamoDBMapper.load(Participant.class, input.getId());
        return "test was added";
    }

}