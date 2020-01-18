package panda3.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import panda3.converters.LanguageConverter;
import panda3.converters.QuestionConverter;

import java.util.List;

@DynamoDBTable(tableName = "tests_table")
public class Test {
    private String id;
    private String title;
    private Language language;
    private List<Question> questions;
    private String recruiterId;

    public Test(){
    }

    @DynamoDBHashKey(attributeName = "id")
    @DynamoDBAutoGeneratedKey
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @DynamoDBTypeConverted(converter = LanguageConverter.class)
    @DynamoDBAttribute(attributeName = "language")
    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }


    @DynamoDBTypeConverted(converter = QuestionConverter.class)
    @DynamoDBAttribute(attributeName = "questions")
    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    @DynamoDBAttribute(attributeName = "recruiterId")
    public String getRecruiterId() {
        return recruiterId;
    }

    public void setRecruiterId(String recruiterId) {
        this.recruiterId = recruiterId;
    }
}
