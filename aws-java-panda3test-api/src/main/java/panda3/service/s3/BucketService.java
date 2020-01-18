package panda3.service.s3;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.dynamodbv2.model.QueryRequest;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import com.csvreader.CsvWriter;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import panda3.config.Config;
import panda3.creators.CsvCreator;
import panda3.creators.TestCreator;
import panda3.model.Question;
import panda3.model.Test;

import java.io.*;
import java.nio.charset.Charset;
import java.util.List;

public class BucketService {
    private AmazonS3 s3 = AmazonS3ClientBuilder.defaultClient();
    private static final Logger logger = LoggerFactory.getLogger(BucketService.class);
    public BucketService() {}

    public Test uploadFile(String key) throws SdkClientException, IOException, CsvException {
        logger.error(key);
        S3Object s3Object = s3.getObject(new GetObjectRequest(Config.BUCKET_NAME, key));
        logger.error(s3Object.getKey());
        try(CSVReader csvReader = new CSVReader(new BufferedReader(new InputStreamReader(s3Object.getObjectContent())))) {
            return TestCreator.createTestCsv(csvReader);
        }
    }


    public void downloadFile(String key, Test test) throws IOException {
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        CsvWriter writer = new CsvWriter(stream, ',', Charset
                .forName("ISO-8859-1"));

        List<Question> questions = test.getQuestions();

        String line;
        int i = 1;
        for(Question question : questions){
            line = "";
            line = CsvCreator.ConvertQuestionToCsV(question, i, test.getLanguage().getValue());
            writer.write(line);
            writer.endRecord();
        }



        writer.close();
        stream.close();

        AccessControlList acl = new AccessControlList();
        acl.grantPermission(GroupGrantee.AllUsers, Permission.Read); //all users or authenticated

        InputStream inputStream = new ByteArrayInputStream(stream.toByteArray());
        PutObjectRequest request = new PutObjectRequest(Config.BUCKET_NAME, key, inputStream, null);
        request.setAccessControlList(acl);
        s3.putObject(request);
    }

}
