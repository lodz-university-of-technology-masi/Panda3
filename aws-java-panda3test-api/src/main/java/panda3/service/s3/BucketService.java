package panda3.service.s3;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import panda3.config.Config;
import panda3.creators.TestCreator;
import panda3.model.Test;

import java.io.*;

public class BucketService {
    private AmazonS3 s3 = AmazonS3ClientBuilder.defaultClient();

    public BucketService() {}

    public Test uploadFile(String key) throws SdkClientException, IOException {
        S3Object s3Object = s3.getObject(new GetObjectRequest(Config.BUCKET_NAME, key));
        try(CSVReader csvReader = new CSVReader(new BufferedReader(new InputStreamReader(s3Object.getObjectContent())))) {
            return TestCreator.createTestCsv(csvReader);
        }
    }


    public void downloadFile(String key) throws SdkClientException, IOException{
        PutObjectRequest request = new PutObjectRequest(Config.BUCKET_NAME, key, new File("test.csv"));
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType("plaint/text");
        metadata.addUserMetadata("x-amz-meta-title", "someTitle");
        request.setMetadata(metadata);
        s3.putObject(request);
    }
}
