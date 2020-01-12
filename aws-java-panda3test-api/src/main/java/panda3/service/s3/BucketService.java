package panda3.service.s3;

import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import panda3.config.Config;

import java.io.File;

class BucketService {
    private AmazonS3 s3Client;

    public BucketService(){
        AmazonS3 s3Client =  AmazonS3ClientBuilder
                .standard()
                .withRegion(Config.REGION)
                .withCredentials(new EnvironmentVariableCredentialsProvider())
                .build();
    }


    public void uploadFile(File file){
        PutObjectRequest putObjectRequest = new PutObjectRequest(Config.BUCKET_NAME,
                                                                file.getName(),
                                                                file);
        PutObjectResult putObjectResult = s3Client.putObject(putObjectRequest);
    }
}
