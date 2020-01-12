package panda3.service.s3;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.opencsv.CSVReader;
import panda3.creators.TestCreator;
import panda3.identificators.IdentyficatorsController;
import panda3.model.Test;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import panda3.config.Config;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

public class BucketService {
    private AmazonS3 s3 = AmazonS3ClientBuilder.defaultClient();

    public BucketService() {}

    public Test uploadFile(String key) throws SdkClientException, IOException {
        S3Object s3Object = s3.getObject(new GetObjectRequest(IdentyficatorsController.BUCKET_NAME, key));
        String answer = "";
        BufferedReader reader = new BufferedReader(new InputStreamReader(s3Object.getObjectContent()));
        CSVReader csvReader = new CSVReader(reader);
        List<String[]> allData = csvReader.readAll();

        Test test = new Test();
        test.setTitle(allData.get(0)[0]);
        return TestCreator.createTestCsv(csvReader);
    }
}
