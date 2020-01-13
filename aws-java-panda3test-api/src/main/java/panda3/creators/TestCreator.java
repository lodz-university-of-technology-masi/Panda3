package panda3.creators;

import com.fasterxml.jackson.databind.JsonNode;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import panda3.model.Language;
import panda3.model.Question;
import panda3.model.RTest;
import panda3.model.Test;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
public class TestCreator {
    public static Test createTestJSON(JsonNode body, List<Question> questions, String userId){
        Test test = new Test();
        JsonNode language = body.get("language");
        test.setTitle(body.get("title").asText());
        test.setLanguage(new Language(language.get("label").textValue(), language.get("value").textValue()));
        test.setQuestions(questions);
        test.setRecruiterId(userId);
        return test;
    }



    public static Test createUpdateTestJSON(JsonNode body, List<Question> questions, String userId){
        Test test = TestCreator.createTestJSON(body, questions, userId);
        test.setId(body.get("id").asText());
        return test;
    }


    public static Test createTestCsv(CSVReader csvReader) throws IOException, CsvException {

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        Test test = new Test();
        ArrayList<Question> questions = new ArrayList<Question>();
        List<String[]> allData = csvReader.readAll();
        try {
            for (int i = 0; i < allData.size(); i++) {
                questions.add(TestCreator.convertCsvStringToQuestion(allData.get(i)[0].split(";",7)));
                test.setLanguage(TestCreator.generateLanguage(allData.get(i)[0].split(";",7)[2]));
            }
        } catch (Exception e){
        }

        test.setQuestions(questions);
        test.setTitle("Imported Test at " +  dtf.format(now));
        return test;
    }

    public static Question convertCsvStringToQuestion(String[] csvLine){
        Question question = new Question();
        question.setType(csvLine[1]);
        question.setQuestion(csvLine[3]);
        if(csvLine[4].equals("|")){
            question.setAnswers(null);
        }
        else{
            question.setAnswers(TestCreator.convertCsvAnswerToString(csvLine[5], csvLine[4]));
        }
        return question;
    }


    public static List<String> convertCsvAnswerToString(String answer, String number){
        List<String> answers= new ArrayList<String>();
        String[] singleAnswers = answer.split("\\|", Integer.parseInt(number));
        for(int i = 0; i<singleAnswers.length; i++)
            answers.add(singleAnswers[i]);
        return  answers;
    }


    public static Language generateLanguage(String lang){
        Language language = null;
        if(lang.equals("EN"))
            language = new Language("English", "en");
        else if(lang.equals("PL"))
            language = new Language("Polish", "pl");
        else
            language = new Language("Diffrent", "DF");
        return language;
    }



    public static RTest createRTestResponse(Test test){
        RTest rTest = new RTest();
        rTest.setTitle(test.getTitle());
        rTest.setLabel(test.getLanguage().getLabel());
        rTest.setId(test.getId());
        return  rTest;
    }



    public static List<RTest> createRTestListResponse(List<Test> tests){
        List<RTest> rTests = new ArrayList<RTest>();
        for(Test test : tests)
            rTests.add(TestCreator.createRTestResponse(test));
        return rTests;
    }


    //1;O;EN;List at least two corporate values at IBM;|;
    //3;O;EN;List at least two corporate values at IBM;3;[zle  srednio  dobrze];
}
