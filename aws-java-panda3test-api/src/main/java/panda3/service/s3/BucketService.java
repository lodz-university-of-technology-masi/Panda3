package panda3.service.s3;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.opencsv.CSVReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import panda3.config.Config;
import panda3.creators.TestCreator;
import panda3.model.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class BucketService {
    private AmazonS3 s3 = AmazonS3ClientBuilder.defaultClient();
    private static final Logger logger = LoggerFactory.getLogger(BucketService.class);
    public BucketService() {}

    public Test uploadFile(String key) throws SdkClientException, IOException {
        logger.error(key);
        S3Object s3Object = s3.getObject(new GetObjectRequest(Config.BUCKET_NAME, key));
        logger.error(s3Object.getKey());
        try(CSVReader csvReader = new CSVReader(new BufferedReader(new InputStreamReader(s3Object.getObjectContent())))) {
            return TestCreator.createTestCsv(csvReader);
        }
    }
}
