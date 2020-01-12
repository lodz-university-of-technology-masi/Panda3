package panda3.service.s3;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.opencsv.CSVReader;
import panda3.creators.TestCreator;
import panda3.identificators.IdentyficatorsController;
import panda3.model.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class BucketService {
    private AmazonS3 s3 = AmazonS3ClientBuilder.defaultClient();

    public BucketService() {}

    public Test uploadFile(String key) throws SdkClientException, IOException {
        S3Object s3Object = s3.getObject(new GetObjectRequest(IdentyficatorsController.BUCKET_NAME, key));
        try(CSVReader csvReader = new CSVReader(new BufferedReader(new InputStreamReader(s3Object.getObjectContent())))) {
            return TestCreator.createTestCsv(csvReader);
        }
    }
}
