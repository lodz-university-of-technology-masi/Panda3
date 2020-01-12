package panda3.creators;

import com.fasterxml.jackson.databind.JsonNode;
import com.opencsv.CSVReader;
import panda3.model.Language;
import panda3.model.Question;
import panda3.model.Test;

import java.awt.*;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class TestCreator {
    public static Test createTestJSON(JsonNode body, List<Question> questions){
        Test test = new Test();
        JsonNode language = body.get("language");
        test.setTitle(body.get("title").asText());
        test.setLanguage(new Language(language.get("label").textValue(), language.get("value").textValue()));
        test.setQuestions(questions);
        return test;
    }



    public static Test createUpdateTestJSON(JsonNode body, List<Question> questions){
        Test test = TestCreator.createTestJSON(body, questions);
        test.setId(body.get("id").asText());
        return test;
    }


    public static Test createTestCsv(CSVReader csvReader) throws IOException {

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        Test test = new Test();
        ArrayList<Question> questions = new ArrayList<Question>();
        List<String[]> allData = csvReader.readAll();
        for (int i = 0; i < allData.size(); i++) {
            questions.add(TestCreator.convertCsvStringToQuestion(allData.get(i)[0].split(";",6)));
            test.setLanguage(TestCreator.generateLanguage(allData.get(i)[0].split(";",6)[2]));

        }
        test.setQuestions(questions);
        test.setTitle("Imported Test at " +  dtf.format(now));
        csvReader.close();
        return test;
    }

    public static Question convertCsvStringToQuestion(String[] csvLine){
        Question question = new Question();
        question.setType(csvLine[1]);
        question.setQuestion(csvLine[3]);
        if(csvLine[4].equals("|"))
            question.setAnswers(null);
        else
            question.setAnswers(TestCreator.convertCsvAnswerToString(csvLine[5], csvLine[4]));
        return question;
    }


    public static List<String> convertCsvAnswerToString(String answer, String number){
        List<String> answers= new ArrayList<String>();
        String[] singleAnswers = answer.split("|", Integer.parseInt(number));
        for(int i = 0; i<singleAnswers.length; i++)
            answers.add(singleAnswers[i]);
        return  answers;
    }


    public static Language generateLanguage(String lang){
        Language language = null;
        if(lang.equals("EN"))
            language = new Language("English", "EN");
        else if(lang.equals("PL"))
            language = new Language("Polish", "PL");
        else
            language = new Language("Diffrent", "DF");
        return language;
    }
    //1;O;EN;List at least two corporate values at IBM;|;
    //3;O;EN;List at least two corporate values at IBM;3;[zle  srednio  dobrze];
}
