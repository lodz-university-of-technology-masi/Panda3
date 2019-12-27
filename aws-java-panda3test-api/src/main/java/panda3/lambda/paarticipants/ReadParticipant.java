package panda3.lambda.paarticipants;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import panda3.mappers.TablesMapper;
import panda3.model.Participant;
import panda3.responses.ApiResponseHandler;
import panda3.validator.ParticipantValidator;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public class ReadParticipant implements RequestHandler<Map<String, Object>, ApiGatewayResponse>{

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {

        try {
            Participant participant = new TablesMapper("participants_table").getAllParticipant(input.get("id").toString());
            return ApiResponseHandler.createResponse(participant, 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }

}