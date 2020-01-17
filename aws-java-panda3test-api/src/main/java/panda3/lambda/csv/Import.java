package panda3.lambda.csv;



import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.S3Event;
import com.amazonaws.services.s3.event.S3EventNotification;
import panda3.mappers.TablesMapperTest;
import panda3.model.Test;
import panda3.service.s3.BucketService;

import java.io.IOException;

public class Import implements RequestHandler<S3Event, String> {
    BucketService bucketService = new BucketService();

    @Override
    public String handleRequest(S3Event event, Context ctx) {
        S3EventNotification.S3EventNotificationRecord record = event.getRecords().get(0);
        Test testAnswer = null;
        try {
            testAnswer = bucketService.uploadFile(record.getS3().getObject().getKey());
        } catch (Exception e) {
            e.printStackTrace();
        }
        new TablesMapperTest().saveTest(testAnswer);
            return null;
    }
}
